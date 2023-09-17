export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'dfagrhsbsfvs234==3423-32344eds=323143=34edsaf3rfegbdc_e2212'
}
