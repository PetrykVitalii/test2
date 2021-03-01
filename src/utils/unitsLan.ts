export default (name: string, common: any) => {
  switch (name) {
    case 'Kg':
      return common.kg;
    case 'Carton':
      return common.carton;
    case 'Packet':
      return common.packet;
    case 'Piece':
      return common.piece;
    case 'Bottle':
      return common.bottle;
    case 'Custom':
      return common.custom;
    default:
      return name;
  }
};
