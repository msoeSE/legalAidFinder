const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://legalhelpwi:KUOBlu5rRm5crd8A@cluster0-shard-00-00-fjfgt.mongodb.net:27017,cluster0-shard-00-01-fjfgt.mongodb.net:27017,cluster0-shard-00-02-fjfgt.mongodb.net:27017/legalhelpwi?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
  port: process.env.PORT || 8000,
};

export default config;
