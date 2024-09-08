import { openDatabase } from "./indexedDB.js";

export function importData(jsonString) {
  // Verificar se os dados já foram importados
  if (localStorage.getItem("dataImported")) {
    console.log("Dados já foram importados anteriormente.");
    return;
  }

  const data = JSON.parse(jsonString);

  openDatabase().then((db) => {
    const transaction = db.transaction("users", "readwrite");
    const usersStore = transaction.objectStore("users");

    for (let item in data) {
      usersStore.add(data[item]);
    }

    transaction.oncomplete = () => {
      console.log("Dados importados com sucesso.");
      // Definir a flag no localStorage para indicar que os dados foram importados
      localStorage.setItem("dataImported", "true");
    };

    transaction.onerror = () => {
      console.log("Erro ao importar dados.");
    };
  });
}

const jsonString = `{
  "users": [
    {
      "name": "1a1a",
      "phone": "81998953981",
      "email": "1a1a@1a1a.com",
      "password": "36eb8f12ac2d4f023ce94a6f60301ec3c59f25597868286744ad9bb8be6650e1"
    },
    {
      "name": "aaaaa aaaaaa",
      "phone": "81998953981",
      "email": "aaa@aaa.com",
      "password": "9c520caf74cff9b9a891be3694b20b3586ceb17f2891ceb1d098709c1e0969a3"
    },
    {
      "name": "Gabriel Moreira",
      "phone": "81998953981",
      "email": "abc@def.com",
      "password": "11b68cd605d696c22778480ea3fb137907e83df8e365ee133ef2dcca7c18ceba"
    },
    {
      "name": "adad adad",
      "phone": "(81) 99895-3981",
      "email": "adad@adad.com",
      "password": "c217016dc11b17853849363e14d5c1945364e905444000a86befe5c18a698e75",
      "address": {
        "street": "Rua AAAA",
        "number": "222",
        "complement": "22",
        "neighborhood": "asdsadsd",
        "cep": "51170-435",
        "city": "Recife",
        "state": "PE"
      }
    },
    {
      "name": "abcd",
      "phone": "81998953981",
      "email": "bbb@bbb.com",
      "password": "77cd27bc3de668c18ed6be5f5c2909ffdacdf67705c30d132003ad5a89085deb"
    },
    {
      "name": "cccc",
      "phone": "81998953981",
      "email": "ccc@ccc.com",
      "password": "7ff5e3dac2a290dd7b14f69f1b435be64003aabe2cd98acaa5490f0e3d1483f3"
    },
    {
      "name": "Cleide",
      "phone": "81998953981",
      "email": "clcl@clcl.com",
      "password": "14af716cca2367ff73ebc17855a1f57df1850e4ea80244592f74cc20293849cf"
    },
    {
      "name": "sdasd vdasd",
      "phone": "81998953981",
      "email": "ddd@ddd.com",
      "password": "c10d1643eca056908686e9528a6da3bdf0d7f7407f1d6d42788b9fb96f36a61d"
    },
    {
      "name": "obama",
      "phone": "81998953981",
      "email": "eee@eee.com",
      "password": "d56f235dcdb3ee766d23a5a1a58c4f86601ea8ea46fffe21a912ff7c2f1dc7bb"
    },
    {
      "name": "Gabriel Moreira",
      "phone": "81998953981",
      "email": "gabrielmoreiratfv@gmail.com",
      "password": "123456789"
    },
    {
      "name": "hhh",
      "phone": "81998953981",
      "email": "hhh@hhh.com",
      "password": "8c69c4e1e6c3fd8cc5fe7f7b096f93f144e280a823dfe1a570d4722bd1bf7b57"
    },
    {
      "name": "Jurema da Silva",
      "phone": "81998953981",
      "email": "jjj@jjj.com",
      "password": "e6e800594bc05be9f05264e85150e57ef8465c6e0b046404c8771069122e1c7b"
    },
    {
      "name": "Maricleide",
      "phone": "81998953981",
      "email": "mmm@mmm.com",
      "password": "4deef5a4285f3afb8850d8e5898e3e43daa35089762a4c7f683043c279495114"
    },
    {
      "name": "ppp",
      "phone": "81998953981",
      "email": "ppp@ppp.com.br",
      "password": "5ed98545f534bc120957530d10d7d952b2bb48b015fde84fa20b6be3cc01b0f3"
    }
  ]
}`;
importData(jsonString);
