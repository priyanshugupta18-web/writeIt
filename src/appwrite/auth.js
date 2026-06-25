import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
    this.userId = ID.unique();
  }

  async createUser({ email, password, name, userId }) {
    try {
      const userAccount = await this.account.create({
        userId: userId,
        email: email,
        password: password,
      });

      if (userAccount) {
        // call another method
        return this.login({email, password});
      } else {
        return userAccount;
      }
    } catch (err) {
      console.log("Appwrite serive :: createUser :: error", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({
        email: email,
        password: password,
      });
    } catch(err) {
        console.log("Appwrite serive :: login :: error", error);
    }
  }

  async getCurrentUSer() {
    try{
        return await this.account.get();
    } 
    catch(err) {
        console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logOut() {
    try{
        await this.account.deleteSessions();
    }
    catch(err) {
        console.log("Appwrite serive :: logOut :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
