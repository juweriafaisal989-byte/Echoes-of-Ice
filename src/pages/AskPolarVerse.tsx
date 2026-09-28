import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import type { ChatMessage } from '../types';
import { expeditions } from '../data/mockData';
import { SectionHeader, SourceBadge } from '../components/ui';

const suggested = [
  'What were the main objectives of this expedition?',
  'Which datasets were collected?',
  'Which publications are connected to this expedition?',
  'Who were the researchers involved?',
  'Explain this research in simple language.',
  'Why is this research important?',
];

const flagship = expeditions[0];

function answerFor(question: string): ChatMessage {
  const q = question.toLowerCase();
  if (q.includes('objective')) {
    return {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: `The ${flagship.title} focused on: ${flagship.researchObjectives.join('; ')}.`,
      sources: [{ label: `${flagship.title} Report`, type: 'Report' }],
    };
  }
  if (q.includes('dataset')) {
    return {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: `Two datasets were collected during this expedition: a landfast ice thickness time series and a coastal sediment microbiome sequencing set.`,
      sources: [
        { label: 'Larsemann Hills Landfast Ice Thickness Survey', type: 'Dataset' },
        { label: 'Coastal Sediment Microbiome Sequencing Set', type: 'Dataset' },
      ],
    };
  }
  if (q.includes('publication')) {
    return {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: `Three publications are connected to this expedition, covering early sea-ice break-up, microbial diversity shifts, and coastal margin retreat.`,
      sources: [
        { label: 'Early Break-up of Landfast Sea Ice near the Larsemann Hills', type: 'Publication' },
        { label: 'Microbial Diversity Shifts along a Retreating Ice Margin', type: 'Publication' },
      ],
    };
  }
  if (q.includes('researcher') || q.includes('who')) {
    return {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: `The expedition team included Dr. Ananya Rao (Principal Scientist, sea ice dynamics), Dr. Sana Thomas (glaciology), and Dr. Karan Mehta (polar microbiology).`,
      sources: [{ label: `${flagship.title} Report`, type: 'Report' }],
    };
  }
  if (q.includes('simple') || q.includes('explain')) {
    return {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: `Scientists camped on the Antarctic coast to watch how the ice near the shore breaks apart each year, and to study tiny living things in the mud underneath. This year the ice broke up earlier than usual, which tells researchers the coastline is changing faster than expected.`,
      sources: [{ label: `${flagship.title} Report`, type: 'Report' }],
    };
  }
  if (q.includes('important') || q.includes('why')) {
    return {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: `Coastal sea ice protects Antarctic shorelines and supports marine life. Understanding why it is breaking up earlier helps scientists predict future changes to sea level, ecosystems, and global climate patterns.`,
      sources: [{ label: `${flagship.title} Report`, type: 'Report' }],
    };
  }
  return {
    id: crypto.randomUUID(),
    role: 'assistant',
    content: `I can answer questions about Echoes of Ice's demo expeditions, publications and datasets — for example, try asking about the ${flagship.title}.`,
    sources: [{ label: `${flagship.title} Report`, type: 'Report' }],
  };
}

export default function AskEchoesOfIce() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hi! I'm Ask Echoes of Ice, running in DEMO AI MODE. Ask me about the ${flagship.title}, or try one of the suggestions below.`,
    },
  ]);
  const [input, setInput] = useState('');

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: text };
    const answer = answerFor(text);
    setMessages((prev) => [...prev, userMsg, answer]);
    setInput('');
  };

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <SectionHeader
        title="Ask Echoes of Ice"
        subtitle="An AI research assistant grounded in the Echoes of Icedemo database"
        action={
          <span className="flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
            <Sparkles size={13} /> DEMO AI MODE
          </span>
        }
      />

      <div className="card-surface flex h-[520px] flex-col">
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 text-sm ${
                  m.role === 'user' ? 'bg-polar-700 text-white' : 'bg-polar-frost text-polar-900'
                }`}
              >
                <p>{m.content}</p>
                {m.sources && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.sources.map((s) => (
                      <SourceBadge key={s.label}>{s.label}</SourceBadge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 border-t border-polar-800/10 p-3">
          {suggested.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-polar-800/15 px-3 py-1 text-xs text-polar-800 hover:border-polar-700/40"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-polar-800/10 p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about an expedition, dataset or publication…"
            className="flex-1 rounded-md border border-polar-800/15 bg-polar-frost px-3 py-2 text-sm outline-none focus:border-polar-700/40 focus:bg-white"
          />
          <button type="submit" className="flex items-center gap-1.5 rounded-md bg-polar-700 px-4 py-2 text-sm font-medium text-white hover:bg-polar-600">
            <Send size={14} /> Send
          </button>
        </form>
      </div>
    </div>
  );
}
