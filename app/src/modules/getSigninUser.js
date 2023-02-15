import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export function getSigninUser() {
  onAuthStateChanged(auth, async user => {
    if (user) {
      return user;
    } else {
      return false;
    }
  });
};
