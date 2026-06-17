import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';

const config = JSON.parse(readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
// Firebase v10 initialization requires passing databaseId optionally
import { initializeFirestore } from "firebase/firestore";
const db = initializeFirestore(app, { experimentalForceLongPolling: true }, config.firestoreDatabaseId);

async function main() {
  try {
    const docRef = doc(db, 'pages', 'home');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const needsUpdate = data.heroTitle?.includes('Power Your Life') || data.sections?.hero?.title?.includes('Power Your Life');
      
      if (needsUpdate) {
        console.log('Updating document...');
        
        const updates: any = {};
        if (data.heroTitle?.includes('Power Your Life')) {
            updates.heroTitle = 'Solar Solutions Built for \n<span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-green-500 pb-2 inline-block">Northern Territory Conditions</span>';
        }
        
        if (data.sections?.hero?.title?.includes('Power Your Life')) {
            updates.sections = { ...data.sections };
            updates.sections.hero.title = 'Solar Solutions Built for <br />\n<span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-green-500 pb-2 inline-block">Northern Territory Conditions</span>';
        }
        
        await updateDoc(docRef, updates);
        console.log('Done!');
      } else {
        console.log('No update needed.');
      }
    }
  } catch(e) {
    console.error(e);
  }
}

main();
