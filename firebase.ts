import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import {
  Firestore,
  collection,
  doc,
  getFirestore,
  setDoc,
  where,
  query,
  getDocs,
  getDoc,
  Timestamp,
  getCountFromServer,
  orderBy,
  updateDoc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

import {
  DestinationInterface,
  MessageType,
  PlanInterface,
  UserType,
} from "./src/utils/interfaces";
import { uuidv4 } from "@firebase/util";
import { intToDate, dateToMonthYear } from "./src/utils/fn/dates";
import { _stringify } from "./src/utils/fn";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqlFyP07FbZfz2sngBpx__gSgWGpiJBD8",
  authDomain: "travel-27010.firebaseapp.com",
  projectId: "travel-27010",
  storageBucket: "travel-27010.appspot.com",
  messagingSenderId: "807819502101",
  appId: "1:807819502101:web:d69a49318bc191f11e641c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const addPlan = async (plan: PlanInterface) => {
  const uid = uuidv4();

  const stratingDate = intToDate(plan.startingDate);
  const endingDate = intToDate(plan.endingDate);

  try {
    await setDoc(
      doc(
        db,
        "plans",
        `${
          plan.title
        }@@${stratingDate.toString()}-${endingDate.toString()}@@${uid}`
      ),
      { ...plan, uid }
    );
  } catch (error) {
    throw new Error("Could Not Create A Plan");
  }
};

interface fetchPlansProps {
  startingDate: number;
  endingDate: number;
  selectedDestinations: DestinationInterface[];
}

export const createDestination = async (
  dest: DestinationInterface,
  destinations: DestinationInterface[]
) => {
  if (destinations.indexOf(dest) !== -1) return false;
  else {
    await setDoc(doc(db, `initialData/destinations`), {
      list: destinations.concat([dest]),
    });

    return true;
  }
};

//

const formatPlanData = (data: PlanInterface): PlanInterface => {
  return {
    ...data,
    destinations: data.destinations.map((dest) => JSON.parse(dest)),
  };
};

export const fetchPlans = async ({
  startingDate,
  endingDate,
  selectedDestinations,
}: fetchPlansProps) => {
  if (selectedDestinations.length === 0) return [];
  let plans = [];

  // query 1
  // server :     |-----|
  // client : |--------|

  const q1 = query(
    collection(db, "plans"),
    where(
      "destinations",
      "array-contains-any",
      selectedDestinations.map((dest) => _stringify(dest))
    ),
    where("startingDate", "<", endingDate),
    where("startingDate", ">=", startingDate)
  );
  try {
    const q1Snapshot = await getDocs(q1);
    q1Snapshot.forEach((doc) => {
      const data = doc.data() as PlanInterface;
      plans.push(formatPlanData(data));
      console.log("q1", doc.data().title);
    });
  } catch (error) {
    console.log(error);
  }

  // query 2
  // server : |-----|
  // client :    |------|

  try {
    const q2 = query(
      collection(db, "plans"),
      where(
        "destinations",
        "array-contains-any",
        selectedDestinations.map((dest) => _stringify(dest))
      ),
      where("endingDate", ">", startingDate),
      where("endingDate", "<=", endingDate)
    );

    const q2Snapshot = await getDocs(q2);
    q2Snapshot.forEach((doc) => {
      const data = doc.data() as PlanInterface;
      plans.push(formatPlanData(data));

      console.log("q2", doc.data().title);
    });
  } catch (error) {
    console.log(error);
  }

  // query 3 (month prior to starting month)
  // server : |-------------|
  // client :      |------|

  const prevMonth = dateToMonthYear(
    intToDate(startingDate).add({ months: -1 })
  );

  try {
    const q3 = query(
      collection(db, "plans"),
      where(
        "destinations",
        "array-contains-any",
        selectedDestinations.map((dest) => _stringify(dest))
      ),
      where("departureMonthYear", "==", prevMonth),
      where("endingDate", ">", endingDate)
    );

    const q3Snapshot = await getDocs(q3);

    q3Snapshot.forEach((doc) => {
      const data = doc.data() as PlanInterface;
      plans.push(formatPlanData(data));
      console.log("q3", doc.data().title);
    });
  } catch (error) {
    console.log(error);
  }

  // query 4 (starting month)
  // server : |----------|
  // client :   |------|

  const currentMonth = dateToMonthYear(intToDate(startingDate));

  try {
    const q4 = query(
      collection(db, "plans"),
      where(
        "destinations",
        "array-contains-any",
        selectedDestinations.map((dest) => _stringify(dest))
      ),
      where("departureMonthYear", "==", currentMonth),
      where("endingDate", ">", endingDate)
    );

    const q4Snapshot = await getDocs(q4);

    q4Snapshot.forEach((doc) => {
      const data = doc.data() as PlanInterface;
      plans.push(formatPlanData(data));
      console.log("q4", doc.data().title);
    });
  } catch (error) {
    console.log(error);
  }

  plans = plans?.filter(
    (item, index) => plans.findIndex((i) => i.uid === item.uid) === index
  );

  return await plans;
};

export const createAnAccount = async (user): Promise<User> => {
  const res = await createUserWithEmailAndPassword(
    auth,
    user.email,
    user.password
  );

  await setDoc(doc(db, "users", res.user.email), {
    id: res.user.uid,
    fullName: user.name,
    country: "Israel",
  });

  return res.user;
};

export const createUserAdditionalData = async (
  user: User,
  additionalData: UserType
) => {
  await setDoc(doc(db, "users", user.email), additionalData);
};

export const signIn = async (email, password): Promise<User> => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
};

export const fetchUserAdditionalData = async (user: User) => {
  const res = await getDoc(doc(db, "users", user.email));
  return res.data() as UserType;
};

export const getUser = async (id) => {
  try {
    const res = await getDocs(
      query(collection(db, "users"), where("uid", "==", id))
    );

    const data = [];
    res.forEach((doc) => {
      data.push(doc.data());
    });

    if (data.length > 1) throw new Error("Multiple Users With Same ID");

    return data[0];
  } catch (error) {
    throw new Error("Could Not Find User");
  }
};

export const getUserPlans = async (id) => {
  try {
    const data = [];
    const res = await getDocs(
      query(collection(db, "plans"), where("creatorUid", "==", id))
    );

    res.forEach((doc) => data.push(doc.data()));

    return data;
  } catch (error) {
    throw new Error(`Could Not Find User's Plans`);
  }
};

export const getAllChats = async (id: string) => {
  try {
    const chats = [];
    const res = await getDocs(
      query(
        collection(db, "chats"),
        where("ids", "array-contains", id),
        orderBy("time")
      )
    );

    res.forEach((item) => {
      chats.push(item.data());
    });
    return chats;
  } catch (error) {
    // throw new Error("Could Not Get All Chats");
    console.log(error);
  }
};

export const createChat = async (
  ref: DocumentReference<DocumentData>,
  doc: any
) => {
  try {
    await setDoc(ref, doc);
  } catch (error) {
    return error;
  }
};

//

export const sendPrivateMessage = async (
  value: string,
  from: UserType,
  to: UserType,
  refrence: MessageType = null
) => {
  try {
    const name = [from.uid, to.uid].sort().toString();
    const messageId = uuidv4();
    const time = serverTimestamp();
    const chatDocRef = doc(db, `chats`, name);

    let message = {
      value,
      from,
      time,
      id: messageId,
      ...(refrence !== null && { refrence }),
    };

    try {
      await updateDoc(chatDocRef, {
        latestMessage: value,
        time,
      });

      // Updated Collection Document
      console.log("Updated Chat");
    } catch (error) {
      const res = await (await getDoc(chatDocRef)).exists();
      if (!res) {
        await createChat(chatDocRef, {
          users: [from, to],
          ids: [from.uid, to.uid],
          latestMessage: value,
          time,
          name,
        });

        console.log("Created Chat");
      }

      // Created Collection Document
    }

    // Creates Message Document
    await setDoc(doc(db, `chats/${name}/chat`, messageId), message);
  } catch (error) {
    console.log(error);
  }
};

export const sendGroupMessage = async (
  value: string,
  from: UserType,
  groupId: string
) => {
  try {
    const messageId = uuidv4();
    const time = serverTimestamp();
    const chatDocRef = doc(db, `groupChats`, groupId);

    const message = {
      value,
      from,
      time,
      id: messageId,
    };

    try {
      // Updates Collection Document
      await updateDoc(chatDocRef, {
        latestMessage: value,
        time,
      });

      console.log("Updated Chat");
    } catch (error) {
      const res = await (await getDoc(chatDocRef)).exists();
      if (!res) {
        await createChat(chatDocRef, {
          users: [from],
          ids: [from.uid],
          latestMessage: value,
          time,
        });

        console.log("Created Chat");
      }
    }

    // Creates Message Document
    await setDoc(
      doc(db, `groupChats/${groupId}/${messageId}`, messageId),
      message
    );
  } catch (error) {
    console.log(error);
  }
};
