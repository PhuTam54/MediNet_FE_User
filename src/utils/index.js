export const mapStatusFromEnum = (status) => {
    switch (status) {
      case 0:
        return "PENDING";
      case 1:
        return "CONFIRMED";
      case 2:
        return "SHIPPING";
      case 3:
        return "SHIPPED";
      case 4:
        return "COMPLETE";
      case 5:
        return "CANCEL";
      default:
        return "UNKNOWN";
    }
  };
  
  export const getStatusColor = (status) => {
      switch (status) {
        case 0:
          return "#FFA500"; // orange for PENDING
        case 1:
          return "#01d6a3"; // green for CONFIRMED
        case 2:
          return "#0000FF"; // blue for SHIPPING
        case 3:
          return "#008000"; // green for SHIPPED
        case 4:
          return "#228B22"; // forest green for COMPLETE
        case 5:
          return "#FF0000"; // red for CANCEL
        default:
          return "#808080"; // gray for UNKNOWN
      }
    };