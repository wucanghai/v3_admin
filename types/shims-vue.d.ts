declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<unknown, unknown, unknown>
  export default component
}

declare module '*.scss' {
  const scss: Record<string, string>
  export default scss
}
