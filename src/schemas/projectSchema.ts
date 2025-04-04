import { Schema, Document, model } from 'mongoose';

interface IStage extends Document {
  name: string;
  description: string;
  estimatedTime: number;
  status: 'pending' | 'in-progress' | 'done';
}

export interface IProject extends Document {
  name: string;
  description: string;
  technologies: string[];
  stages: IStage[];
  createdBy: string;
  deadline: Date;
  status: boolean;
}

const stagesSchema = new Schema<IStage>({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 2000,
  },
  estimatedTime: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'in-progress', 'done'],
  },
});

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 2000,
    },
    technologies: {
      type: [String],
      required: true,
    },
    stages: {
      type: [stagesSchema],
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    deadline: {
      type: Date,
      required: true,
    },
    status: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = model<IProject>('Project', projectSchema);
export default Project;
