export const ORDERS_STATUS = {
  1: 'Pendiente',
  2: 'Confirmada/Recibida',
  3: 'En proceso/Preparando',
  4: 'Enviada/En tránsito',
  5: 'En ruta de entrega/Por entregar',
  6: 'Entregada',
  7: 'Cancelada/Devuelta',
};

export const VALID_ORDER_STATUSES = Object.keys(ORDERS_STATUS).map(Number);
