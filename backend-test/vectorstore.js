/**
 * OpenAI Vector Store Management Script
 * Usage:
 * 1 → Create new vector store
 * 2 → List all vector stores
 * 3 <storeId> → Delete a vector store
 * 4 <storeId> → List PDFs/files inside a vector store
 */

import OpenAI from "openai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const action = process.argv[2];
const storeId = process.argv[3];

async function createVectorStore() {
  const store = await openai.vectorStores.create({
    name: `manashakti-${Date.now()}`
  });

  console.log("\n✅ Vector store created");
  console.log("ID:", store.id);
  console.log("Name:", store.name);
  console.log("\n👉 Save this ID in .env as OPENAI_VECTOR_STORE_ID\n");
}

async function listVectorStores() {
  const stores = await openai.vectorStores.list();

  if (!stores.data.length) {
    console.log("\n⚠️ No vector stores found\n");
    return;
  }

  console.log("\n📦 Vector Stores:\n");
  stores.data.forEach((s, i) => {
    console.log(`${i + 1}. ${s.id} → ${s.name}`);
  });
  console.log("");
}

async function deleteVectorStore(id) {
  if (!id) {
    console.log("❌ Please provide vector store ID");
    return;
  }

  await openai.vectorStores.del(id);
  console.log(`\n🗑️ Vector store deleted: ${id}\n`);
}

async function listFilesInStore(id) {
  if (!id) {
    console.log("❌ Please provide vector store ID");
    return;
  }

  const files = await openai.vectorStores.files.list(id);

  if (!files.data.length) {
    console.log("\n⚠️ No files found in this vector store\n");
    return;
  }

  console.log(`\n📄 Files in Vector Store (${id}):\n`);
  files.data.forEach((file, i) => {
    console.log(
      `${i + 1}. File ID: ${file.id} | Status: ${file.status}`
    );
  });
  console.log("");
}

async function main() {
  try {
    switch (action) {
      case "1":
        await createVectorStore();
        break;

      case "2":
        await listVectorStores();
        break;

      case "3":
        await deleteVectorStore(storeId);
        break;

      case "4":
        await listFilesInStore(storeId);
        break;

      default:
        console.log(`
❌ Invalid command

Usage:
1 → Create new vector store
2 → List all vector stores
3 <storeId> → Delete a vector store
4 <storeId> → List PDFs/files inside a vector store

Examples:
node vectorstore.js 1
node vectorstore.js 2
node vectorstore.js 3 vs_abc123
node vectorstore.js 4 vs_abc123
`);
    }
  } catch (err) {
    console.error("\n❌ Error:", err.message || err);
  }
}

main();
