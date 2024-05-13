import { Router } from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProject,
  getProjectWorkpackages,
} from "../service/projects.controller.js";
import { Project } from "../models/Project.js";

const router = Router();

// router.get("/", getProjects);
router.get("/", async (req, res) => {
  try {
    const projects = await Project.findAll({
      attributes: ["id", "title", "description"],
    });
    res.json(projects);
  } catch (error) {}

});
// router.post("/", createProject);
router.post("/", async (req, res) => {
  const project = await Project.create({
    title: 'title',
    description: 'description'
  });

  try {
    res.json(project);
    console.log(project);
  }catch(err) {
    return res.err(err);
  }
})
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);
router.get("/:id", getProject);
router.get("/:id/workpackages", getProjectWorkpackages);

export default router;
