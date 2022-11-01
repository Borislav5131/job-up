import { JobCategory } from "../enums/job-category.enum";
import { JobType } from "../enums/job-type.enum";

export interface JobModel {
  id: string,
  title: string,
  description: string,
  likes: number,
  jobType : JobType,
  jobCategory: JobCategory,
}