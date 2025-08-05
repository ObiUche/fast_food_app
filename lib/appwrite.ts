import {Account, Avatars, Client, Databases, ID, Query, Storage} from "react-native-appwrite";
import {CreateUserParams, GetMenuParams, SignInParams} from "@/type";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: "con.obi.foodordering",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: '688f6b6c0024dfd991e9',
    bucketId: '6890c3cd003965ee4b64',
    userCollectionId: '688f6bb0003c24c09133',
    categoriesCollectionId: '6890bfda0014166846ba',
    menuCollectionId: '6890c099001e34481a65',
    customizationsCollectionId: '6890c1ca001a18011ab8',
    menuCustomizationsCollectionId: '6890c299002fc4826b1e'
}

export const client = new Client()

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

export const account = new Account( client );
export const databases = new Databases(client);
export const storage = new Storage(client)
const avatar = new Avatars(client);

export const createUser = async({email, password, name} : CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique() , email, password, name);
        if(!newAccount) throw Error;

        await signIn({email, password});
        const avatarUrl = avatar.getInitialsURL(name);

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { email, name, accountId: newAccount.$id, avatar: avatarUrl }

        );


    } catch (e) {
        throw new Error(e as string)
    }
}

export const signIn = async({email , password}: SignInParams) => {
    try{
        const session = await account.createEmailPasswordSession( email, password)
    } catch(e){
        throw new Error(e as string)
    }
}

export const getCurrentUser = async () => {
    try{
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0]

    } catch (e) {
        console.log(e);
        throw new Error(e as string);
    }
}

export const getMenu = async({category, query}: GetMenuParams) => {
    try {
        const queries: string[] = [];
        if(category) queries.push(Query.equal('categories', category));
        if(query) queries.push(Query.search('name', query));

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries,
        )

        return menus.documents;

    }catch(e){
        throw new Error(e as string)
    }
}


export const getCategories = async() => {
    console.log("I work");
    try{
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
        )

        return categories.documents;
    } catch (e) {
        throw new Error(e as string)
    }
}