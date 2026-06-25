import config from "../config/config";
import { Client, Account, ID, Databases, storage, Query } from "appwrite";

export class StorageService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.createDocument({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteCollectionId,
        documentId: slug,
        data: {
          title: title,
          content: content,
          featuredImage: featuredImage,
          status: status,
          userId: userId,
        },
      });
    } catch (err) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    try {
      return await this.databases.updateDocument({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteCollectionId,
        documentId: slug,
        data: {
          title: title,
          content: content,
          featuredImage: featuredImage,
          status: status,
        },
      });
    } catch (err) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }

  async deletPost(slug) {
    try {
      await this.databases.deleteDocument({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteCollectionId,
        documentId: slug,
      });
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
    }
    return false;
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteCollectionId,
        documentId: slug,
      });
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteCollectionId,
        queries: queries,
      });
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }

  // servies for file uploads

  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: config.appwriteBucketId,
        fileId: ID.unique(),
        file: file,
      });
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
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
        console.log("Appwrite serive :: deleteFile :: error", error);
        return false;
    }
  }

  async getFilePreview(fileId) {
    try {
      return await this.bucket.getFilePreview({
        bucketId: config.appwriteBucketId,
        fileId: fileId,
      });
    } catch (error) {
      console.log("Appwrite serive :: getFilePreview :: error", error);
      return false;
    }
  }
}

const storageService = new StorageService();
