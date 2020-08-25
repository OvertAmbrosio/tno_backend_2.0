export type TRespuesta = {
  readonly status: string,
  readonly message: string,
  readonly data?: Array<any> | any
}

export type TErrorsLogin = {
  readonly username?: string,
  readonly password?: string,
}