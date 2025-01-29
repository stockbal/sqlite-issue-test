namespace demo;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity Calculations : cuid, managed {
    calculatedOn : Date;
}
