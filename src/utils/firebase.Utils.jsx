import {
  doc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../../firebase.config';

async function getAllDocuments(collectionName) {
  const querySnapShot = await getDocs(collection(db, collectionName));
  const documents = querySnapShot.map((doc) => ({ id: doc.id, ...doc.data() }));

  return documents;
}

async function addDocument(collectionName, data) {
  const docRef = await addDoc(collection(db, collectionName), data);
  return docRef.id;
}

async function updateDocument(collectionName, docId, updatedData) {
  const docRef = doc(db, collectionName, docId);
  try {
    await updateDoc(docRef, updatedData);
    console.log('update success');
  } catch (error) {
    console.error('error updating: ', error);
  }
}

async function deleteDocument(collectionName, docId) {
  const docRef = doc(db, collectionName, docId);
  try {
    await deleteDoc(docRef);
    console.log('doc deleted successfully: ', error);
  } catch (error) {
    console.error('error deleting: ', error);
  }
}

export { getAllDocuments, addDocument, updateDocument, deleteDocument };
