// This script is used to seed the Firestore database with the portfolio data.
// To run this script, use the command: npm run seed:db

import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { portfolioSchema } from './schemas';

const portfolioData = {
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

async function seedDatabase() {
  console.log('Starting to seed database...');
  try {
    // Validate data with Zod schema
    const validatedData = portfolioSchema.parse(portfolioData);
    
    // The document will be stored in the 'portfolio' collection with a specific ID 'data'
    const portfolioDocRef = doc(db, 'portfolio', 'data');
    
    await setDoc(portfolioDocRef, validatedData);
    
    console.log('✅ Database seeded successfully!');
    console.log('Your portfolio data is now stored in Firestore under the document: /portfolio/data');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    if (error instanceof Error && 'code' in error && error.code === 'permission-denied') {
        console.error('Firestore security rules might be denying write access. Please check your rules in the Firebase console.');
    }
  }
}

seedDatabase();
