import type { ClientFunctions } from '../../src/types'

export function setupClientRPC() {
  const nuxt = useNuxtApp()
  const router = useRouter()

  Object.assign(clientFunctions, {
    async refresh(type) {
      // refresh useAsyncData
      nuxt.hooks.callHookParallel('app:data:refresh', [type])
    },
    async callHook(hook: string, ...args: any[]) {
      nuxt.hooks.callHookParallel(hook as any, ...args)
    },
    async onTerminalData(data) {
      // @ts-expect-error fail to extend hooks
      nuxt.hooks.callHookParallel('devtools:terminal:data', data)
    },
    async onTerminalExit(data) {
      // @ts-expect-error fail to extend hooks
      nuxt.hooks.callHookParallel('devtools:terminal:exit', data)
    },
    async navigateTo(path: string) {
      if (router.currentRoute.value.path !== path)
        router.push(path)
    },
  } satisfies ClientFunctions)
}
