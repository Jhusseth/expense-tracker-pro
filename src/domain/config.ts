import { ExpenseService } from '@/application/services/impl/ExpenseService'
import { GoogleSheetsService } from '@/application/services/impl/GoogleSheetsService'
import { LocalStorageRepository } from '@/infrastructure/persistence/LocalStorageRepository'
import { ApiRepository } from '@/infrastructure/persistence/ApiRepository'
import { PersistenceType } from './types'

const PERSISTENCE_TYPE = (import.meta.env.VITE_PERSISTENCE_TYPE || 'local') as PersistenceType

function createExpenseService(): ExpenseService | GoogleSheetsService {
  switch (PERSISTENCE_TYPE) {
    case 'api':
      const apiRepository = new ApiRepository()
      return new ExpenseService(apiRepository)

    case 'google-sheets':
      return new GoogleSheetsService()

    case 'local':
    default:
      const localRepository = new LocalStorageRepository()
      return new ExpenseService(localRepository)
  }
}

export const expenseService = createExpenseService()

export const persistenceType = PERSISTENCE_TYPE
