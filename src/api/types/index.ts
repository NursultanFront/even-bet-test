export const enum Status {
  'NONE' = 'NONE',
  'NEW' = 'NEW', // "Новое предложение"
  // After New
  'PASSED_FIRST_TOUR' = 'PASSED_FIRST_TOUR', // "Прошло первый тур отбора"
  'NOT_PASSED_FIRST_TOUR' = 'NOT_PASSED_FIRST_TOUR', // "Не прошло первый тур отбора"
  'SPAM' = 'SPAM', // "Отправлено в архив предложений-спам"

  // After PASSED_FIRST_TOUR
  'PASSED_SECOND_TOUR' = 'PASSED_SECOND_TOUR', // "Прошло второй тур отбора"
  'NOT_PASSED_SECOND_TOUR' = 'NOT_PASSED_SECOND_TOUR', // "Не прошло второй тур отбора"

  //
  'GRADED' = 'GRADED',

  // After PASSED_SECOND_TOUR
  'DELAYED' = 'DELAYED', // "Отложено"
  'REQUIRED_RESOURCES' = 'REQUIRED_RESOURCES', // "Включено в план внедрения так как требует привлечения ресурсов: время, деньги, технологии"
  'REQUIRED_RESPONSIBLE' = 'REQUIRED_RESPONSIBLE', // "Включено в протокол внедрения с назначением ответственного за реализацию"

  // After REQUIRED_RESOURCES and REQUIRED_RESPONSIBLE
  'REALIZED' = 'REALIZED', // "Реализовано"
  'IN_REALIZATION' = 'IN_REALIZATION', // "В реализации"
  'NOT_EXECUTED' = 'NOT_EXECUTED', // "Не исполнено"

  // After NOT_PASSED_SECOND_TOUR
  'ALREADY_REALIZED' = 'ALREADY_REALIZED', // "Уже в реализации/реализовано"
  'NOT_REQUIRE_REALIZATION' = 'NOT_REQUIRE_REALIZATION', // "Не требует реализации"

  // After NOT_PASSES_FIRST_TOUR
  'REQUIRED_CLARIFICATION' = 'REQUIRED_CLARIFICATION', // "Предложение требует разъяснений"
  'REPEATED' = 'REPEATED', // "Предложение повторяющиеся"
  'UNACCEPTABLE' = 'UNACCEPTABLE', // "Предложение неприемлимо"  // noqa
  'DELICATE_ANSWER' = 'DELICATE_ANSWER', // "Необходим деликатный ответ об отклонении предложения"
}

export type WithUuid = {
  uuid: string
}

export type WithDateAt = {
  created_at: string
  updated_at: string
}

export type WithPagable = {
  count: number
  next: string | null
  previous: string | null
}

export type ListOf<T> = {
  results: T[]
} & WithPagable
