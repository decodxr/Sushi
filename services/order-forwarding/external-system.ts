import type {ForwardingOrder} from './types';
export async function forwardToExternalSystem(order:ForwardingOrder){void order;return {enabled:false as const,reason:'Integração externa não configurada.'}}
