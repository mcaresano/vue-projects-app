import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Project } from '../interfaces/project.interface'
import { v4 as uuidv4 } from 'uuid'
import { useLocalStorage } from '@vueuse/core'

const initialLoad = (): Project[] => {
  return []
  // aca se puede crear este inicialLoad si es necesario sino se envia un [] directamente en el useLocalStorage
  /*  {
        id: '1',
        name: 'project 1',
        tasks: []
    },
]*/
}

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', initialLoad())) // se crea el proyecto (referencia reactiva)

  const addproject = (name: string) => {
    if (!name) return
    projects.value.push({
      id: uuidv4(),
      name: name,
      tasks: []
    })
  }

  const addTaskToProject = (projectId: string, taskName: string) => {
    if (taskName.trim().length === 0) return
    const project = projects.value.find((project) => project.id === projectId)
    if (!project) return
    project.tasks.push({
      id: uuidv4(),
      name: taskName
    })
  }

  const toggleTask = (projectId: string, taskId: string) => {
    console.log(taskId)
    const project = projects.value.find((p) => p.id === projectId)
    console.log(project.tasks)
    if (!project) return
    const task = project.tasks.find((t) => t.id === taskId)
    if (!task) return
    task.completedAt = task.completedAt ? undefined : new Date()
  }

  return {
    // properties
    //projects,

    //getters (propiedades computadas)
    projectList: computed(() => [...projects.value]),
    noProjects: computed(() => projects.value.length === 0),
    projectWithCompletion: computed(() => {
      return projects.value.map((p) => {
        const total = p.tasks.length
        const completed = p.tasks.filter((t) => t.completedAt).length
        const completion = total === 0 ? 0 : (completed / total)*100
        console.log(completion)
        return {
          id: p.id,
          name: p.name,
          completed,
          taskCount: total,
          completion: completion
        }
      })
    }),
    //Actions
    addproject,
    addTaskToProject,
    toggleTask
  }
})
