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
  }

  async createUser({ email, password, fullName}) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        email: email,
        name: fullName,
        password: password,
      });

      if (userAccount) {
        // call another method
        return this.login({email, password});
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite serive :: createUser :: error", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({
        email: email,
        password: password,
      });
    } catch(error) {
        console.log("Appwrite serive :: login :: error", error);
    }
  }

  async getCurrentUser() {
    try{
        return await this.account.get();
    } 
    catch(error) {
        console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logOut() {
    try{
        await this.account.deleteSessions();
    }
    catch(error) {
        console.log("Appwrite serive :: logOut :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
