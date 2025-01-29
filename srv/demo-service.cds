using {demo} from '../db/schema';

service DemoService {
    @readonly
    entity Calculations as projection on demo.Calculations;
}
