
'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Projects from '@/components/sections/projects';
import Contact from '@/components/sections/contact';
import Experience from '@/components/sections/experience';
import ResearchToReality from '@/components/sections/research-to-reality';
import Chatbot from '@/components/chatbot';
import { getPortfolioData } from './actions';
import type { portfolioSchema } from '@/lib/schemas';
import type { z } from 'zod';
import { Skeleton } from '@/components/ui/skeleton';

type PortfolioData = z.infer<typeof portfolioSchema>;

// Hardcoded fallback data in case database fails
const fallbackData: PortfolioData = {
  skills: [
    'LangChain', 'LangGraph', 'CrewAI', 'AutoGen', 'OpenAI API', 'Hugging Face', 'RAG', 'HyDE', 'Query Decomposition',
    'Multi-agent orchestration', 'Tool-calling patterns', 'Self-reflective RAG', 'Chain-of-thought reasoning',
    'Model Context Protocol (MCP)', 'LLM observability', 'Evaluation frameworks', 'Prompt optimization',
    'Python (AI-enhanced)', 'Java', 'C++', 'SQL', 'JavaScript',
    'GitHub Copilot', 'ChatGPT', 'Claude', 'Cursor IDE',
    'React', 'AWS', 'Azure', 'MySQL', 'Git', 'Docker'
  ],
  projects: [
    {
      title: 'Multi-Agent Conversational Search System',
      description: 'Built production-ready conversational search using LangGraph + CrewAI orchestration with hybrid retrieval, graph RAG, and self-reflective query decomposition.',
      impact: '65% improvement in search relevance, 40% faster query resolution.',
      tags: ['LangGraph', 'CrewAI', 'Advanced RAG', 'Orchestration'],
      threeSceneType: 'sphere',
      keyResearch: 'HyDE, Self-RAG',
    },
    {
      title: 'AI-Native Developer Experience Platform',
      description: 'Developed specialized AI agents and MCP servers for automated code generation, context-aware debugging, and intelligent documentation using AutoGen framework.',
      impact: '50% reduction in development time, automated 80% of testing workflows.',
      tags: ['AutoGen', 'MCP', 'Developer Tools', 'Code Generation'],
      threeSceneType: 'torusKnot',
      keyResearch: 'Multi-Agent CoT',
    },
    {
      title: 'Hydro Nexus – Agentic IoT Data Governance',
      description: 'Created multi-agent system for autonomous data pipeline management, quality monitoring, and predictive analytics using CrewAI orchestration.',
      impact: 'Advanced to EDII-TN finals; autonomous agents reduced manual intervention by 70%.',
      tags: ['CrewAI', 'IoT', 'Data Governance', 'Autonomous Agents'],
      threeSceneType: 'octahedron',
      keyResearch: 'Agentic Workflows',
    },
  ],
  experiences: [
    {
      role: 'AI Engineering Lead',
      company: 'WoowLocal Retail Tech',
      date: 'Apr–Jun 2025',
      description: 'Led cross-functional team building agentic workflows for automated project management. Implemented LLM observability and evaluation frameworks, achieving 25% faster delivery cycles.'
    },
    {
      role: 'Founder & AI Systems Architect',
      company: 'Shrink (MSME Registered)',
      date: 'Oct 2023–Jan 2025',
      description: 'Designed multi-agent prototyping system for automated 3D design and simulation workflows. Advanced to national finals using novel AI agent orchestration for creative processes.'
    }
  ],
  certifications: [
    {
      title: 'Generative AI Professional – Oracle',
      description: 'Multi-agent systems & LLM orchestration'
    },
    {
      title: 'NLP Specialist – Microsoft Azure',
      description: 'Production RAG implementation'
    },
    {
      title: 'Google Project Management',
      description: 'Cross-functional AI team leadership'
    },
    {
      title: 'Advanced Algorithms & DBMS – CodeChef',
      description: ''
    }
  ],
  researchImplementations: [
    {
      title: 'Self-RAG: Learning to Retrieve, Generate, and Critique',
      description: 'Implementation of a system where the model learns to retrieve passages and critique its own generations, improving factual accuracy and relevance. Key for enterprise-grade RAG.',
      githubUrl: 'https://github.com/TN-Light/awesome-agent-and-cog',
      tags: ['Self-Correction', 'RAG', 'Factual Accuracy']
    },
    {
      title: 'Chain-of-Thought for Multi-Agent Collaboration',
      description: 'Developed agents that use step-by-step reasoning to coordinate tasks, significantly improving complex problem-solving capabilities in a team of AI agents.',
      githubUrl: 'https://github.com/TN-Light/awesome-agent-and-cog',
      tags: ['Multi-Agent', 'Reasoning', 'Orchestration']
    },
    {
      title: 'HyDE: Precise Zero-shot Dense Retrieval without Relevance Labels',
      description: 'Built a system that generates a hypothetical document to create a more effective vector for semantic search, boosting retrieval performance without needing training data.',
      githubUrl: 'https://github.com/TN-Light/awesome-agent-and-cog',
      tags: ['Zero-shot Learning', 'Dense Retrieval', 'Search']
    }
  ],
};


function LoadingSkeleton() {
  return (
    <div className="space-y-16 py-16">
      <div className="container mx-auto px-6">
        <Skeleton className="h-8 w-1/2 mx-auto" />
        <Skeleton className="h-4 w-3/4 mx-auto mt-4" />
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Skeleton className="h-80 rounded-lg" />
          <Skeleton className="h-80 rounded-lg" />
          <Skeleton className="h-80 rounded-lg" />
        </div>
      </div>
      <div className="container mx-auto px-6">
        <Skeleton className="h-8 w-1/2 mx-auto" />
        <Skeleton className="h-4 w-3/4 mx-auto mt-4" />
        <div className="grid md:grid-cols-2 gap-16 mt-16">
          <Skeleton className="h-64 rounded-lg" />
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </div>
    </div>
  )
}


export default function Home() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPortfolioData();
        if (data) {
          setPortfolioData(data);
        } else {
          setPortfolioData(fallbackData);
        }
      } catch (error) {
        console.error("Failed to fetch portfolio data, using fallback.", error);
        setPortfolioData(fallbackData);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow">
          <Hero />
          <LoadingSkeleton />
        </main>
        <Footer />
      </div>
    )
  }

  if (!portfolioData) {
     return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Portfolio</h2>
          <p className="text-muted-foreground mb-6">
            Could not fetch portfolio data. Please try again later.
          </p>
        </div>
      </div>
    )
  }
  
  const displayData = portfolioData || fallbackData;

  return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow">
          <Hero />
          <About skills={displayData.skills} />
          <Projects projects={displayData.projects} />
          <ResearchToReality implementations={displayData.researchImplementations || []} />
          <Experience 
            experiences={displayData.experiences}
            certifications={displayData.certifications}
          />
          <Contact />
        </main>
        <Footer />
        {portfolioData && <Chatbot portfolioData={portfolioData} />}
      </div>
  );
}
