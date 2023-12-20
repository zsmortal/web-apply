import { useDataStore } from './modules/data'
import { useSystemStore } from './modules/system'
import { useUserStore } from './modules/user'

export const store: ObjectType = {}

export const registerStore = () => {
  store.data = useDataStore()
  store.system = useSystemStore()
  store.user = useUserStore()
}
