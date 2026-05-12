import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { generateChatResponse } from '../lib/gemini';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Bonjour ! Posez-moi vos questions concernant nos projets, budgets, impacts ou générez des études de cas en PDF.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerBtnRef = useRef<HTMLButtonElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Focus input when chat opens
      setTimeout(() => inputRef.current?.focus(), 300);
    } else if (!isOpen && triggerBtnRef.current) {
      // Return focus to trigger button when closed
      triggerBtnRef.current?.focus();
    }
  }, [isOpen]);

  const generatePDF = (pdfData: any) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(0, 65, 107);
    doc.text(`Consultation: ${pdfData.projectName}`, 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Rapport généré le ${new Date().toLocaleDateString()}`, 14, 28);
    
    // Overview
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Vue d'ensemble", 14, 40);
    doc.setFontSize(11);
    const overviewLines = doc.splitTextToSize(pdfData.overview || "", 180);
    doc.text(overviewLines, 14, 48);
    
    let nextY = 48 + (overviewLines.length * 5) + 10;
    
    // Data table
    let tableData = [
      ["Information", "Détail"],
      ["Période/Chronologie", pdfData.timeline || "-"],
      ["Budget", pdfData.budget || "-"],
      ["Défis Techniques", pdfData.technicalChallenges || "-"],
      ["Impact Stratégique", pdfData.strategicImpact || "-"],
      ["Considérations Environnementales", pdfData.environmentalConsiderations || "-"],
      ["Retours du Client", pdfData.clientFeedback || "-"]
    ];

    if (pdfData.reportType === 'detailed' || !pdfData.reportType) {
      tableData.push(["Leçons Apprises", pdfData.lessonsLearned || "-"]);
      tableData.push(["Recommandations Futures", pdfData.futureRecommendations || "-"]);
    }
    
    autoTable(doc, {
      startY: nextY,
      head: [tableData[0]],
      body: tableData.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [0, 65, 107] },
      styles: { fontSize: 10, cellPadding: 5 }
    });
    
    doc.save(`KRB_Case_Study_${pdfData.projectName.replace(/\s+/g, '_')}.pdf`);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const data = await generateChatResponse(userMessage, messages.slice(1));
      
      if (data.action === "generate_pdf") {
        generatePDF(data.pdfData);
      }
      
      setMessages(prev => [...prev, { role: 'model', text: data.text || '' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Une erreur s\'est produite. Veuillez réessayer.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {/* Hidden chat window for structure */}
      <div 
        role="dialog"
        aria-label="Assistant IA KRB"
        aria-hidden={!isOpen}
        className={`bg-surface border border-outline-variant rounded-2xl shadow-xl w-[380px] md:w-[420px] ${isOpen ? 'flex' : 'hidden'} flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right h-[600px] max-h-[80vh]`}
      >
        <div className="bg-primary text-on-primary p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-on-primary font-bold">IA</div>
            <div>
              <h2 className="font-headline-sm text-sm font-bold m-0">Assistant KRB</h2>
              <p className="font-label-sm text-xs opacity-80 m-0">Générateur de Cas Pratiques</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="hover:bg-primary/50 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-on-primary"
            aria-label="Fermer le chat"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
        
        <div className="p-4 flex-grow bg-surface-container-lowest flex flex-col overflow-y-auto gap-stack-md custom-scrollbar" role="log" aria-live="polite">
          {messages.map((msg, idx) => (
            <article key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'model' && (
                 <div className="w-8 h-8 rounded-full bg-secondary text-primary flex-shrink-0 flex items-center justify-center text-xs font-bold mr-2 mt-1" aria-hidden="true">IA</div>
              )}
              <div 
                className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-on-primary rounded-tr-sm shadow-sm' 
                    : 'bg-surface-container text-on-surface rounded-tl-sm border border-outline-variant shadow-sm'
                }`}
              >
                <div className={`font-body-md leading-relaxed ${msg.role === 'user' ? 'text-on-primary' : 'text-on-surface markdown-body-chat'}`}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            </article>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-secondary text-primary flex-shrink-0 flex items-center justify-center text-xs font-bold mr-2 mt-1">IA</div>
              <div className="bg-surface-container text-on-surface p-4 rounded-2xl rounded-tl-sm border border-outline-variant shadow-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" aria-hidden="true" />
                <span className="font-body-md text-sm">Génération de la réponse...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 bg-surface border-t border-outline-variant">
          <div className="flex gap-2">
            <input 
              ref={inputRef}
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Posez votre question..." 
              aria-label="Message à envoyer"
              className="flex-grow border border-outline bg-surface-container-lowest rounded-full px-4 py-3 font-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              aria-label="Envoyer"
              className="bg-primary text-on-primary w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <Send className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Launcher */}
      <button 
        ref={triggerBtnRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Fermer l'assistant virtuel" : "Ouvrir l'assistant virtuel"}
        aria-expanded={isOpen}
        className="w-14 h-14 bg-primary text-on-primary rounded-full shadow-[0px_8px_32px_rgba(0,65,107,0.3)] flex items-center justify-center hover:bg-secondary hover:text-primary transition-all group relative focus:outline-none focus:ring-4 focus:ring-primary/30"
      >
        {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <MessageSquare className="w-6 h-6" aria-hidden="true" />}
        
        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-full mr-4 bg-surface text-primary border border-outline-variant font-label-sm px-4 py-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none" aria-hidden="true">
            Discuter avec l'IA
          </div>
        )}
      </button>
    </div>
  );
}
