<template>
  <div class="w-full">
    <section class="m-2">
      <bread-crumbs :name="project?.name ?? 'No tienen nombre'" />
    </section>
    <section class="m-2">
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th class="w-14">Completada</th>
              <td>Tarea</td>
              <td>Completada en</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in project.tasks" :key="task.id" class="hover">
              <th><input
                type="checkbox"
                :checked="!!task.completedAt"
                class="checkbox checkbox-primary"
                @change="projectStore.toggleTask(project?.id ?? '', task.id)"
                ></th>
              <td>{{ task.name }}</td>
              <td>{{ task.completedAt }}</td>
            </tr>
            <tr class="hover">
              <th></th>
              <td>
                <input v-model="newTask" @keyup.enter="addTask"
                  class="input input-primary w-full opacity-60 transmision-all hover:opacity-100 focus:opacity-100"
                  placeholder="Nueva tarea...">
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue';
import { useProjectsStore } from '@/modules/projects/stores/projects.store';
import type { Project } from '../interfaces/project.interface';

interface Props {
  id: string,
}
const router = useRouter()  // para redireccionar se utiliza el router
const props = defineProps<Props>()
const projectStore = useProjectsStore()
const project = ref<Project | null>()
const newTask = ref('');

const addTask = () => {
  if (!project.value.id) return
  if (!newTask.value) return
  projectStore.addTaskToProject(project.value.id, newTask.value)
  newTask.value = '';
}

watch(
  () => props.id,
  () => {
    project.value = projectStore.projectList.find(project => project.id === props.id)
    if (!project.value) router.replace('/')
  },
  {
    immediate: true,  // tan pronto se monta el componente se ejecuta. Se usa cuando actualizas la pagina y recarga
  }
)
</script>
