import { request } from './axios'
import { curdFactory } from '../core/api/curd'

export const curd = curdFactory(request)
