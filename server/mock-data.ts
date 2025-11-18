import type { TableData } from "@shared/schema";

export const mockTableDatasets: TableData[] = [
  {
    headers: ["Product", "Price", "Stock", "Category"],
    rows: [
      ["Laptop", "$1,299", "45", "Electronics"],
      ["Smartphone", "$899", "120", "Electronics"],
      ["Desk Chair", "$249", "78", "Furniture"],
      ["Monitor", "$399", "56", "Electronics"],
      ["Keyboard", "$129", "200", "Accessories"],
    ],
  },
  {
    headers: ["Country", "Population", "GDP (Trillion)", "Capital"],
    rows: [
      ["United States", "331 million", "$23.0", "Washington D.C."],
      ["China", "1.4 billion", "$17.7", "Beijing"],
      ["India", "1.4 billion", "$3.5", "New Delhi"],
      ["Japan", "125 million", "$4.9", "Tokyo"],
      ["Germany", "83 million", "$4.3", "Berlin"],
    ],
  },
  {
    headers: ["Programming Language", "Release Year", "Paradigm", "Popularity Rank"],
    rows: [
      ["Python", "1991", "Multi-paradigm", "1"],
      ["JavaScript", "1995", "Multi-paradigm", "2"],
      ["Java", "1995", "Object-oriented", "3"],
      ["C#", "2000", "Multi-paradigm", "4"],
      ["TypeScript", "2012", "Multi-paradigm", "5"],
    ],
  },
  {
    headers: ["Planet", "Distance from Sun (AU)", "Diameter (km)", "Moons"],
    rows: [
      ["Mercury", "0.39", "4,879", "0"],
      ["Venus", "0.72", "12,104", "0"],
      ["Earth", "1.00", "12,742", "1"],
      ["Mars", "1.52", "6,779", "2"],
      ["Jupiter", "5.20", "139,820", "95"],
    ],
  },
  {
    headers: ["Company", "Industry", "Market Cap (B)", "Founded"],
    rows: [
      ["Apple", "Technology", "$3,000", "1976"],
      ["Microsoft", "Technology", "$2,800", "1975"],
      ["Amazon", "E-commerce", "$1,600", "1994"],
      ["Tesla", "Automotive", "$800", "2003"],
      ["Meta", "Social Media", "$900", "2004"],
    ],
  },
];

export function getRandomTableData(): TableData {
  return mockTableDatasets[Math.floor(Math.random() * mockTableDatasets.length)];
}

export function generateMockResponse(userQuestion: string): string {
  const responses = [
    `Based on your question about "${userQuestion.slice(0, 50)}...", here's a comprehensive overview with relevant data:`,
    `Great question! Let me provide you with detailed information regarding "${userQuestion.slice(0, 50)}...":`,
    `I've analyzed your query about "${userQuestion.slice(0, 50)}..." and compiled the following data:`,
    `Here's what I found about "${userQuestion.slice(0, 50)}...". The table below shows key information:`,
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}
