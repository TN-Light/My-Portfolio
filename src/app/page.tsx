
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
import type { portfolioSchema } from '@/lib/schemas';
import type { z } from 'zod';
import { getPortfolioData } from './actions';
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
      title: 'Hydro Nexus (IoT + AI Smart Farming Platform)',
      description: 'IoT Layer: Smart sensors and actuators for automated water and nutrient control.\n\nAI/ML Layer: Machine learning models for crop health prediction and resource optimization, with predictive analytics for yield forecasting.\n\nConversational Layer: Chatbots for farmers to query farm conditions and receive recommendations.\n\nVisualization Layer: Dashboards with sensor data, AI predictions, and decision support.',
      impact: 'Integrated IoT, AI/ML, and conversational agents to create a comprehensive smart farming solution.',
      tags: ['CrewAI', 'IoT', 'Data Governance', 'Autonomous Agents'],
      threeSceneType: 'octahedron',
      keyResearch: 'Agentic Workflows',
    },
  ],
  experiences: [
    {
      role: 'Project Manager Intern',
      company: 'WoowLocal Retail Tech Pvt. Ltd.',
      date: 'April 2025 - June 2025',
      description: 'Facilitate sprint planning, daily stand-ups, and retrospectives for development team. Led 7-member cross-functional team including developers, designers, and business analysts. Maintain project documentation and stakeholder communication. Support Agile implementation and process improvements.'
    },
    {
      role: 'Founder & Project Lead',
      company: 'Shrink (MSME Registered, University Incubator)',
      date: 'Oct 2023 - Jan 2025',
      description: 'Developed a retractable water bottle prototype; advanced to EDII-TN Voucher A final round. Managed ₹10,000 budget and coordinated 3D design, manufacturing, and testing teams. Directed multi-department daily stand-ups and prepared technical documentation. Gained hands-on experience in product lifecycle management and cross-functional teamwork. Note: Undertaken for skill-building; discontinued post-Jan 2025'
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


export default function Home() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const result = await getPortfolioData();
        if (result.success) {
          setPortfolioData(result.data);
        } else {
          setError(result.error || "An unknown error occurred.");
          setPortfolioData(fallbackData); // Use fallback data on error
        }
      } catch (e) {
        console.error(e);
        setError("An unexpected error occurred while fetching data.");
        setPortfolioData(fallbackData); // Use fallback data on error
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="space-y-4 p-6">
      <Skeleton className="h-24 w-full" />
      <div className="flex gap-4">
        <Skeleton className="h-64 w-1/3" />
        <Skeleton className="h-64 w-1/3" />
        <Skeleton className="h-64 w-1/3" />
      </div>
      <Skeleton className="h-48 w-full" />
    </div>;
  }
  
  if (error && !portfolioData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading Portfolio</h2>
          <p className="text-red-500">{error}</p>
          <p className="mt-4 text-muted-foreground">Could not fetch portfolio data. Please try again later.</p>
      </div>
    )
  }

  if (!portfolioData) {
     return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h2 className="text-2xl font-bold mb-2">Error Loading Portfolio</h2>
            <p className="mt-4 text-muted-foreground">Portfolio data could not be loaded.</p>
        </div>
      )
  }

  return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow">
          <Hero />
          <About skills={portfolioData.skills} />
          <Projects projects={portfolioData.projects} />
          <ResearchToReality implementations={portfolioData.researchImplementations || []} />
          <Experience 
            experiences={portfolioData.experiences}
            certifications={portfolioData.certifications}
          />
          <Contact />
        </main>
        <Footer />
        <Chatbot portfolioData={portfolioData} />
      </div>
  );
}
