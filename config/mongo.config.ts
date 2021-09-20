import { TypegooseModule, TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (): Promise<TypegooseModuleOptions> => {
  return {
    uri: 'mongodb+srv://jora:CfD1nftmCEqtX4JD@cluster0.n0udu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
};
