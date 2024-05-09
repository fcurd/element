import { request } from './axios'
import { curdFactory } from '@fcurd/request'

export const curd = curdFactory(request)
