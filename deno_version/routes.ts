import { RouterContext } from './dependencies.ts';
import db from './mongo.ts';

const propertyCollection = db.collection('properties');

const getProperties = async (ctx: RouterContext) => {
    const properties = await propertyCollection.find();
    ctx.response.body = properties;
};

const createProperty = async (ctx: RouterContext) => {
    const body = await ctx.request.body();
    console.log(body);
    ctx.response.body = 'creating property';
};

export { getProperties, createProperty };
