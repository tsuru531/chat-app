import { config } from '@vue/test-utils';
import PortalMock from './__tests__/unit/PortalMock';
import RouterLinkMock from './__tests__/unit/RouterLinkMock';

config.stubs['portal'] = PortalMock;
config.stubs['router-link'] = RouterLinkMock;
