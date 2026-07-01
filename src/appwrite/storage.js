import config from "../config/config";
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

export class StorageService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
    this.lastId = null;
    this.queryLimit = 5;
  }

  async createPost({ title, slug, content, featuredImage, status }) {
    try {
      return await this.databases.createRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId: slug,
        data: {
          title: title,
          content: content,
          featuredImage: featuredImage,
          status: status,
          userId: ID.unique(),
        },
      });
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId: slug,
        data: {
          title: title,
          content: content,
          featuredImage: featuredImage,
          status: status,
        },
      });
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
      return false;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId: slug,
      });
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
    }
    return false;
  }

  async getPost(slug) {
    try {
      return await this.databases.getRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId: slug,
      });
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  async getInitialPosts() {
    try {
      const page1 = await this.databases.listRows({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        queries: [
          Query.equal("status", "active"),
          Query.orderDesc("$createdAt"),
          Query.limit(this.queryLimit),
        ],
      });
      page1.rows.length === this.queryLimit
        ? (this.lastId = page1.rows[page1.rows.length - 1].$id)
        : null;
      return page1;
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  async getMorePosts() {
    try {
      if (!this.lastId) return false;
      const page2 = await this.databases.listRows({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        queries: [
          Query.equal("status", "active"),
          Query.orderDesc("$createdAt"),
          Query.limit(this.queryLimit),
          Query.cursorAfter(this.lastId),
        ],
      });
      this.lastId =
        page2.rows.length === this.queryLimit
          ? page2.rows[page2.rows.length - 1].$id
          : null;
      return page2;
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  // services for file uploads

  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: config.appwriteBucketId,
        fileId: ID.unique(),
        file: file,
      });
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile({
        bucketId: config.appwriteBucketId,
        fileId: fileId,
      });
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFileView({
        bucketId: config.appwriteBucketId,
        fileId: fileId,
      });
    } catch (error) {
      console.log("Appwrite service :: getFilePreview :: error", error);
      return false;
    }
  }
}

const storageService = new StorageService();

export default storageService;
