import app from "./app.js";
import { sequelize } from "./db/database.js";
import projectsRoutes from "./routes/projects.routes.js";
import workpackagesRoutes from "./routes/workpackages.routes.js";
import studentRoute from "./routes/studentRoute.js";
import companyRoute from "./routes/companyRoute.js";
import userRoute from "./routes/userRoute.js";
import commissionRoute from "./routes/commissionRoute.js";
import documentRoute from "./routes/documentRoute.js";
import cookieParser from 'cookie-parser';

async function main() {
  const port = 3000;

  app.use(cookieParser());

  app.use("/api/projects", projectsRoutes);
  app.use("/api/workpackages", workpackagesRoutes);
  app.use("/api/student", studentRoute);
  app.use("/api/company", companyRoute);
  app.use("/api/commission", commissionRoute);
  app.use('/api/documents', documentRoute)
  app.use("/api", userRoute)

  try {
    await sequelize.sync({ force: false });
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
main();
