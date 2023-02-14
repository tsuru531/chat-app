import { config } from '@vue/test-utils';
import PortalMock from './__tests__/unit/PortalMock';

config.stubs['portal'] = PortalMock;
