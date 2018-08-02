// De fiecare data cand Jest porneste in proiect, o sa se uite in proiect dupa
// , un fisier numit 'setupTests.js'. Si daca il gaseste, o sa il execute
// , inainte sa apuce sa execute alt cod in proiect.

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });