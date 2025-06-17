// Application State
let currentPage = 'tenant-overview';
let currentApp = null;
let currentGroup = null;
let sidebarCollapsed = false;

// Sample Data
const tenantData = {
    name: "Contoso",
    domain: "contoso.onmicrosoft.com",
    users: 1247,
    groups: 156,
    apps: 89,
    devices: 892
};

const enterpriseApps = [
    {
        id: 'ea1',
        name: 'Microsoft Office 365',
        appId: 'a0a0a0a0-b1b1-c2c2-d3d3-e4e4e4e4e4e4',
        type: 'Gallery',
        status: 'Enabled',
        lastSignIn: '2024-06-01',
        users: 1200,
        owners: [
            { name: 'Alice Johnson', email: 'alice.johnson@contoso.com', id: 'user1', type: 'Full Owner' },
            { name: 'Bob Smith', email: 'bob.smith@contoso.com', id: 'user2', type: 'Technical Owner' },
            { name: 'Sales Team', email: 'sales.team@contoso.com', id: 'g1', type: 'Sponsor' },
            { name: 'Sarah Davis', email: 'sarah.davis@contoso.com', id: 'user7', type: 'Sponsor' },
            { name: 'David Lee', email: 'david.lee@contoso.com', id: 'user4', type: 'Contact' },
            { name: 'Emma Brown', email: 'emma.brown@contoso.com', id: 'user5', type: 'Full Owner' }
        ]
    },
    {
        id: 'ea2',
        name: 'Salesforce',
        appId: 'b1b1b1b1-c2c2-d3d3-e4e4-f5f5f5f5f5f5',
        type: 'Gallery',
        status: 'Enabled',
        lastSignIn: '2024-05-28',
        users: 450,
        owners: [
            { name: 'Carol Wilson', email: 'carol.wilson@contoso.com', id: 'user3', type: 'Full Owner' },
            { name: 'Mike Chen', email: 'mike.chen@contoso.com', id: 'user8', type: 'Contact' },
            { name: 'Frank Miller', email: 'frank.miller@contoso.com', id: 'user6', type: 'Technical Owner' },
            { name: 'Alice Johnson', email: 'alice.johnson@contoso.com', id: 'user1', type: 'Sponsor' }
        ]
    },
    {
        id: 'ea3',
        name: 'Custom HR Portal',
        appId: 'c2c2c2c2-d3d3-e4e4-f5f5-g6g6g6g6g6g6',
        type: 'Non-gallery',
        status: 'Enabled',
        lastSignIn: '2024-06-02',
        users: 200,
        owners: [
            { name: 'Sarah Davis', email: 'sarah.davis@contoso.com', id: 'user7', type: 'Full Owner' },
            { name: 'Bob Smith', email: 'bob.smith@contoso.com', id: 'user2', type: 'Contact' }
        ]
    },
    {
        id: 'ea4',
        name: 'Contoso Sales Dashboard',
        appId: '12345678-1234-1234-1234-123456789012',
        type: 'Non-gallery',
        status: 'Enabled',
        lastSignIn: '2024-05-30',
        users: 85,
        owners: [
            { name: 'David Lee', email: 'david.lee@contoso.com', id: 'user4', type: 'Full Owner' },
            { name: 'Emma Brown', email: 'emma.brown@contoso.com', id: 'user5', type: 'Technical Owner' }
        ]
    },
    {
        id: 'ea5',
        name: 'Mobile Finance App',
        appId: '87654321-4321-4321-4321-210987654321',
        type: 'Non-gallery',
        status: 'Enabled',
        lastSignIn: '2024-06-03',
        users: 67,
        owners: [
            { name: 'Carol Wilson', email: 'carol.wilson@contoso.com', id: 'user3', type: 'Full Owner' },
            { name: 'Mike Chen', email: 'mike.chen@contoso.com', id: 'user8', type: 'Technical Owner' },
            { name: 'Sarah Davis', email: 'sarah.davis@contoso.com', id: 'user7', type: 'Contact' }
        ]
    },
    {
        id: 'ea6',
        name: 'Analytics API',
        appId: '11111111-2222-3333-4444-555555555555',
        type: 'Non-gallery',
        status: 'Enabled',
        lastSignIn: '2024-05-29',
        users: 32,
        owners: [
            { name: 'Frank Miller', email: 'frank.miller@contoso.com', id: 'user6', type: 'Sponsor' },
            { name: 'Alice Johnson', email: 'alice.johnson@contoso.com', id: 'user1', type: 'Contact' },
            { name: 'Bob Smith', email: 'bob.smith@contoso.com', id: 'user2', type: 'Technical Owner' }
        ]
    }
];

const appRegistrations = [
    {
        id: 'ar1',
        name: 'Contoso Sales Dashboard',
        appId: '12345678-1234-1234-1234-123456789012',
        clientId: '12345678-1234-1234-1234-123456789012',
        status: 'Active',
        created: '2024-01-15',
        redirectUris: ['https://sales.contoso.com/auth'],
        apiPermissions: ['User.Read', 'Mail.Send'],
        owners: [
            { name: 'David Lee', email: 'david.lee@contoso.com', id: 'user4', type: 'Full Owner' },
            { name: 'Emma Brown', email: 'emma.brown@contoso.com', id: 'user5', type: 'Technical Owner' }
        ]
    },    {
        id: 'ar2',
        name: 'Mobile Finance App',
        appId: '87654321-4321-4321-4321-210987654321',
        clientId: '87654321-4321-4321-4321-210987654321',
        status: 'Active',
        created: '2024-02-20',
        redirectUris: ['com.contoso.finance://auth'],
        apiPermissions: ['User.Read', 'Directory.Read.All'],
        owners: [
            { name: 'Carol Wilson', email: 'carol.wilson@contoso.com', id: 'user3', type: 'Full Owner' },
            { name: 'Mike Chen', email: 'mike.chen@contoso.com', id: 'user8', type: 'Technical Owner' },
            { name: 'Sarah Davis', email: 'sarah.davis@contoso.com', id: 'user7', type: 'Contact' }
        ]
    },
    {
        id: 'ar3',
        name: 'Analytics API',
        appId: '11111111-2222-3333-4444-555555555555',
        clientId: '11111111-2222-3333-4444-555555555555',
        status: 'Active',
        created: '2023-12-10',
        redirectUris: [],
        apiPermissions: ['User.Read', 'Reports.Read.All'],        owners: [
            { name: 'Frank Miller', email: 'frank.miller@contoso.com', id: 'user6', type: 'Sponsor' },
            { name: 'Alice Johnson', email: 'alice.johnson@contoso.com', id: 'user1', type: 'Contact' },
            { name: 'Bob Smith', email: 'bob.smith@contoso.com', id: 'user2', type: 'Technical Owner' }
        ]
    },
    {
        id: 'ar4',
        name: 'Custom HR Portal',
        appId: 'c2c2c2c2-d3d3-e4e4-f5f5-g6g6g6g6g6g6',
        clientId: 'c2c2c2c2-d3d3-e4e4-f5f5-g6g6g6g6g6g6',
        status: 'Active',
        created: '2024-03-15',
        redirectUris: ['https://hr.contoso.com/auth', 'https://hr.contoso.com/callback'],
        apiPermissions: ['User.Read', 'User.ReadBasic.All', 'Directory.Read.All'],
        owners: [
            { name: 'Sarah Davis', email: 'sarah.davis@contoso.com', id: 'user7', type: 'Full Owner' },
            { name: 'Bob Smith', email: 'bob.smith@contoso.com', id: 'user2', type: 'Contact' }
        ]
    }
];

const groups = [
    {
        id: 'g1',
        name: 'Sales Team',
        email: 'sales.team@contoso.com',
        description: 'Sales department members',
        type: 'Security',
        membershipType: 'Assigned',
        members: 45,        owners: [
            { name: 'Alice Johnson', email: 'alice.johnson@contoso.com', id: 'user1', type: 'Full Owner' },
            { name: 'Bob Smith', email: 'bob.smith@contoso.com', id: 'user2', type: 'Contact' }
        ],
        created: '2024-01-15'
    },
    {
        id: 'g2',
        name: 'Marketing Department',
        email: 'marketing.department@contoso.com',
        description: 'Marketing team and contractors',
        type: 'Microsoft 365',
        membershipType: 'Assigned',
        members: 32,        owners: [
            { name: 'Carol Wilson', email: 'carol.wilson@contoso.com', id: 'user3', type: 'Sponsor' }
        ],
        created: '2024-02-01'
    },    {
        id: 'g3',
        name: 'Entra Administrators',
        email: 'entra.administrators@contoso.com',
        description: 'IT department with administrative privileges',
        type: 'Security',
        membershipType: 'Assigned',
        members: 8,        owners: [
            { name: 'David Lee', email: 'david.lee@contoso.com', id: 'user4', type: 'Full Owner' }
        ],
        created: '2023-11-20'
    },
    {
        id: 'g4',
        name: 'Finance Team',
        email: 'finance.team@contoso.com',
        description: 'Finance and accounting personnel',
        type: 'Security',
        membershipType: 'Assigned',
        members: 12,
        owners: [],
        created: '2024-03-10'
    },
    {
        id: 'g5',
        name: 'All Company',
        email: 'all.company@contoso.com',
        description: 'All employees and contractors',
        type: 'Microsoft 365',
        membershipType: 'Dynamic',
        members: 1247,        owners: [
            { name: 'Emma Brown', email: 'emma.brown@contoso.com', id: 'user5', type: 'Technical Owner' }
        ],
        created: '2023-09-15'
    },    {
        id: 'g6',
        name: 'Remote Workers',
        email: 'remote.workers@contoso.com',
        description: 'Employees working remotely',
        type: 'Security',
        membershipType: 'Dynamic',
        members: 578,
        owners: [],
        created: '2024-01-08'
    },
    {
        id: 'g7',
        name: 'Global Administrators',
        email: 'global.administrators@contoso.com',
        description: 'Users with global administrator privileges',
        type: 'Role-assignable security',
        membershipType: 'Assigned',
        members: 5,
        owners: [
            { name: 'Alice Johnson', email: 'alice.johnson@contoso.com', id: 'user1', type: 'Full Owner' },
            { name: 'David Lee', email: 'david.lee@contoso.com', id: 'user4', type: 'Technical Owner' }
        ],
        created: '2023-08-15'
    },
    {
        id: 'g8',
        name: 'Exchange Administrators',
        email: 'exchange.administrators@contoso.com',
        description: 'Users with Exchange Online administrator role',
        type: 'Role-assignable security',
        membershipType: 'Assigned',
        members: 3,
        owners: [
            { name: 'Bob Smith', email: 'bob.smith@contoso.com', id: 'user2', type: 'Sponsor' }
        ],
        created: '2023-10-20'
    },
    {
        id: 'g9',
        name: 'Security Readers',
        email: 'security.readers@contoso.com',
        description: 'Users with read-only access to security reports and settings',
        type: 'Role-assignable security',
        membershipType: 'Assigned',
        members: 12,
        owners: [
            { name: 'Carol Wilson', email: 'carol.wilson@contoso.com', id: 'user3', type: 'Full Owner' }
        ],
        created: '2024-02-14'
    },    {
        id: 'g10',
        name: 'Helpdesk Administrators',
        email: 'helpdesk.administrators@contoso.com',
        description: 'First-line support staff with limited administrative privileges',
        type: 'Role-assignable security',
        membershipType: 'Assigned',
        members: 8,
        owners: [],
        created: '2024-04-10'
    },
    {
        id: 'g11',
        name: 'EMEA IT Support',
        email: 'emea.it.support@contoso.com',
        description: 'IT support team for Europe, Middle East, and Africa region',
        type: 'Security',
        membershipType: 'Assigned',
        members: 15,
        owners: [
            { name: 'Emma Brown', email: 'emma.brown@contoso.com', id: 'user5', type: 'Full Owner' },
            { name: 'Frank Miller', email: 'frank.miller@contoso.com', id: 'user6', type: 'Technical Owner' }
        ],
        created: '2023-09-22'
    },
    {
        id: 'g12',
        name: 'West Coast IT Admins',
        email: 'west.coast.it.admins@contoso.com',
        description: 'IT administrators for West Coast offices (Seattle, San Francisco, Los Angeles)',
        type: 'Security',
        membershipType: 'Assigned',
        members: 12,
        owners: [
            { name: 'Mike Chen', email: 'mike.chen@contoso.com', id: 'user8', type: 'Full Owner' }
        ],
        created: '2023-11-05'
    },
    {
        id: 'g13',
        name: 'East Coast IT Support',
        email: 'east.coast.it.support@contoso.com',
        description: 'IT support team covering New York, Boston, and Atlanta offices',
        type: 'Security',
        membershipType: 'Assigned',
        members: 18,
        owners: [
            { name: 'Sarah Davis', email: 'sarah.davis@contoso.com', id: 'user7', type: 'Sponsor' },
            { name: 'Alice Johnson', email: 'alice.johnson@contoso.com', id: 'user1', type: 'Contact' }
        ],
        created: '2023-10-12'
    },
    {
        id: 'g14',
        name: 'APAC Regional IT',
        email: 'apac.regional.it@contoso.com',
        description: 'Asia-Pacific regional IT team for Singapore, Tokyo, and Sydney offices',
        type: 'Security',
        membershipType: 'Assigned',
        members: 9,
        owners: [
            { name: 'David Lee', email: 'david.lee@contoso.com', id: 'user4', type: 'Full Owner' }
        ],
        created: '2024-01-30'
    },
    {
        id: 'g15',
        name: 'Central IT Operations',
        email: 'central.it.operations@contoso.com',
        description: 'Central IT operations team for Chicago and Dallas offices',
        type: 'Security',
        membershipType: 'Assigned',
        members: 14,
        owners: [
            { name: 'Bob Smith', email: 'bob.smith@contoso.com', id: 'user2', type: 'Technical Owner' },
            { name: 'Carol Wilson', email: 'carol.wilson@contoso.com', id: 'user3', type: 'Contact' }
        ],
        created: '2023-12-18'
    },
    {
        id: 'g16',
        name: 'Canada IT Support',
        email: 'canada.it.support@contoso.com',
        description: 'IT support team for Toronto and Vancouver offices',
        type: 'Security',
        membershipType: 'Assigned',
        members: 7,
        owners: [],
        created: '2024-03-25'
    }
];

// Sample users and groups for owner selection
const availableUsers = [
    { id: 'user1', name: 'Alice Johnson', email: 'alice.johnson@contoso.com', type: 'user' },
    { id: 'user2', name: 'Bob Smith', email: 'bob.smith@contoso.com', type: 'user' },
    { id: 'user3', name: 'Carol Wilson', email: 'carol.wilson@contoso.com', type: 'user' },
    { id: 'user4', name: 'David Lee', email: 'david.lee@contoso.com', type: 'user' },
    { id: 'user5', name: 'Emma Brown', email: 'emma.brown@contoso.com', type: 'user' },
    { id: 'user6', name: 'Frank Miller', email: 'frank.miller@contoso.com', type: 'user' },
    { id: 'user7', name: 'Sarah Davis', email: 'sarah.davis@contoso.com', type: 'user' },
    { id: 'user8', name: 'Mike Chen', email: 'mike.chen@contoso.com', type: 'user' },
    { id: 'user9', name: 'Lisa Garcia', email: 'lisa.garcia@contoso.com', type: 'user' },
    { id: 'user10', name: 'Tom Wilson', email: 'tom.wilson@contoso.com', type: 'user' },
    { id: 'user11', name: 'Kate Anderson', email: 'kate.anderson@contoso.com', type: 'user' },
    { id: 'user12', name: 'John Martinez', email: 'john.martinez@contoso.com', type: 'user' },    // Groups available for owner assignment
    { id: 'g1', name: 'Sales Team', email: 'sales.team@contoso.com', description: 'Sales department members', type: 'group' },
    { id: 'g2', name: 'Marketing Department', email: 'marketing.department@contoso.com', description: 'Marketing team and contractors', type: 'group' },
    { id: 'g3', name: 'Entra Administrators', email: 'entra.administrators@contoso.com', description: 'IT department with administrative privileges', type: 'group' },
    { id: 'g7', name: 'Global Administrators', email: 'global.administrators@contoso.com', description: 'Users with global administrator privileges', type: 'group' },
    { id: 'g11', name: 'EMEA IT Support', email: 'emea.it.support@contoso.com', description: 'IT support team for Europe, Middle East, and Africa region', type: 'group' },
    { id: 'g14', name: 'APAC Regional IT', email: 'apac.regional.it@contoso.com', description: 'Asia-Pacific regional IT team for Singapore, Tokyo, and Sydney offices', type: 'group' },
    { id: 'g15', name: 'Central IT Operations', email: 'central.it.operations@contoso.com', description: 'Central IT operations team for Chicago and Dallas offices', type: 'group' },
    { id: 'g16', name: 'Canada IT Support', email: 'canada.it.support@contoso.com', description: 'IT support team for Toronto and Vancouver offices', type: 'group' },
    { id: 'g4', name: 'HR Department', email: 'hr.department@contoso.com', description: 'Human resources team', type: 'group' },
    { id: 'g5', name: 'Finance Team', email: 'finance.team@contoso.com', description: 'Financial planning and accounting team', type: 'group' },
    { id: 'g6', name: 'Engineering Leads', email: 'engineering.leads@contoso.com', description: 'Senior engineering leadership team', type: 'group' },
    { id: 'g8', name: 'Security Team', email: 'security.team@contoso.com', description: 'Information security specialists', type: 'group' },
    { id: 'g9', name: 'Product Managers', email: 'product.managers@contoso.com', description: 'Product management team', type: 'group' },
    { id: 'g10', name: 'Customer Support', email: 'customer.support@contoso.com', description: 'Customer service representatives', type: 'group' },
    { id: 'g12', name: 'Business Analysts', email: 'business.analysts@contoso.com', description: 'Business analysis and requirements team', type: 'group' },
    { id: 'g13', name: 'Legal Department', email: 'legal.department@contoso.com', description: 'Legal and compliance team', type: 'group' }
];

// Modal state
let selectedOwnersForModal = [];
let currentModalContext = null; // Will store { type: 'enterprise' | 'registration' | 'group', id: string }

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM CONTENT LOADED ===');
    showTenantOverview();
    setupEventListeners();
    
    // Test if functions are accessible globally
    console.log('addOwner function available:', typeof window.addOwner);
    window.addOwner = addOwner; // Make sure it's globally accessible
    window.selectOwnerFromSearch = selectOwnerFromSearch; // Make sure it's globally accessible
    console.log('addOwner now available globally:', typeof window.addOwner);
    console.log('selectOwnerFromSearch now available globally:', typeof window.selectOwnerFromSearch);
});

// Utility function to ensure all modal functions are globally accessible
function ensureModalFunctionsGlobal() {
    window.addOwner = addOwner;
    window.closeAddOwnerModal = closeAddOwnerModal;
    window.addSelectedOwners = addSelectedOwners;
    window.removeSelectedOwner = removeSelectedOwner;
    window.searchPotentialOwners = searchPotentialOwners;
    window.updateSearchResults = updateSearchResults;
    window.updateSelectedOwners = updateSelectedOwners;
    window.selectOwnerFromSearch = selectOwnerFromSearch;
    window.removeOwner = removeOwner;
    window.validateOwnerSelection = validateOwnerSelection;
    window.editOwnerType = editOwnerType;
    console.log('✅ All modal functions assigned globally');
}

function setupEventListeners() {
    // Responsive sidebar toggle
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            document.querySelector('.sidebar').classList.add('collapsed');
            document.querySelector('.main-content').classList.add('expanded');
        } else {
            document.querySelector('.sidebar').classList.remove('collapsed');
            document.querySelector('.main-content').classList.remove('expanded');
        }
    });
      // Event delegation for "Add owner" buttons removed - buttons use onclick handlers directly
}

// Add event listener for closing modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('add-owner-modal');
    
    // Don't process clicks if modal is not visible
    if (!modal || modal.style.display !== 'flex') {
        return;
    }
    
    // Check if modal is in closing state to prevent interference
    if (modal.hasAttribute('data-closing')) {
        console.log('Modal is closing - ignoring document click');
        return;
    }
    
    // Don't interfere with input field interactions
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT' || event.target.tagName === 'TEXTAREA') {
        console.log('Input field interaction - not closing modal');
        return;
    }
    
    // Check if this is a close button click (X button or Cancel button)
    const isCloseButton = event.target.closest('.modal-close') || 
                         event.target.closest('.btn-secondary') ||
                         event.target.closest('button[onclick*="closeAddOwnerModal"]') ||
                         (event.target.tagName === 'BUTTON' && event.target.onclick && 
                          event.target.onclick.toString().includes('closeAddOwnerModal'));
    
    // Check if this is an "Add owner" button click from outside the modal
    const isAddOwnerButton = event.target.closest('button[onclick*="addOwner"]') && 
                           !event.target.closest('#add-owner-modal');
    
    // Check if this is a search result item click
    const isSearchResultClick = event.target.closest('.search-result-item') || 
                               event.target.closest('[onclick*="selectOwnerFromSearch"]');
    
    // Check if this is any modal content click (including all form elements)
    const isModalContent = event.target.closest('.modal-dialog') || 
                          event.target.closest('#add-owner-modal');
    
    // Check if modal was just opened to prevent immediate closure
    const justOpened = modal && modal.hasAttribute('data-just-opened');
    
    console.log('Document click analysis:', {
        isCloseButton,
        isAddOwnerButton, 
        isSearchResultClick,
        isModalContent,
        justOpened,
        modalClosing: modal.hasAttribute('data-closing'),
        target: event.target.className || event.target.tagName,
        targetId: event.target.id
    });
    
    // If it's a close button click, don't interfere - let the onclick handler deal with it
    if (isCloseButton) {
        console.log('Close button clicked - deferring to onclick handler');
        return;
    }
    
    // If it's an outside click (not modal content), close the modal
    if (!isModalContent && !isAddOwnerButton && !isSearchResultClick && !justOpened) {
        console.log('Closing modal due to outside click');
        closeAddOwnerModal();
    } else if (isAddOwnerButton) {
        console.log('Ignoring click - Add owner button from outside modal');
    } else if (isSearchResultClick) {
        console.log('Ignoring click - Search result interaction');
    } else if (isModalContent) {
        console.log('Ignoring click - Inside modal content');    } else if (justOpened) {
        console.log('Ignoring click - Modal just opened');
    }
}, false); // Changed to bubble phase instead of capture phase

// Add event listener for ESC key to close modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('add-owner-modal');
        if (modal && modal.style.display === 'flex') {
            closeAddOwnerModal();
        }
    }
});

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
    sidebarCollapsed = !sidebarCollapsed;
}

function updateBreadcrumb(breadcrumbData) {
    const breadcrumbContent = document.getElementById('breadcrumb-content');
    
    if (typeof breadcrumbData === 'string') {
        // Fallback for old string format
        breadcrumbContent.textContent = breadcrumbData;
        return;
    }
    
    let breadcrumbHTML = '';
    breadcrumbData.forEach((crumb, index) => {
        if (index > 0) {
            breadcrumbHTML += '<span class="breadcrumb-separator">></span>';
        }
        
        if (crumb.onClick) {
            breadcrumbHTML += `<span class="breadcrumb-link" onclick="${crumb.onClick}">${crumb.text}</span>`;
        } else {
            breadcrumbHTML += `<span class="breadcrumb-text">${crumb.text}</span>`;
        }
    });
    
    breadcrumbContent.innerHTML = breadcrumbHTML;
}

function updateNavigation(activeSection) {
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to current section
    const sections = {
        'tenant-overview': 0,
        'tenant-configuration': 1,
        'groups': 3,
        'enterprise-apps': 5,
        'app-registrations': 6
    };
    
    if (sections[activeSection] !== undefined) {
        const navItems = document.querySelectorAll('.nav-item');
        if (navItems[sections[activeSection]]) {
            navItems[sections[activeSection]].classList.add('active');
        }
    }
}

// Dynamic sidebar navigation management
function updateSidebarNavigation(config) {
    const sidebarNav = document.getElementById('sidebar-nav');
      // Clear any existing sub-items
    sidebarNav.querySelectorAll('.nav-sub-item, .nav-sub-header, .nav-sub-items').forEach(item => {
        item.remove();
    });
    
    // Remove expanded class from all nav-items
    sidebarNav.querySelectorAll('.nav-item.expanded').forEach(item => {
        item.classList.remove('expanded');
    });
    
    if (!config) return;
      // Find the appropriate parent nav-item based on type
    let parentNavItem = null;
    
    if (config.type === 'Enterprise applications') {
        // Find "Enterprise applications" nav-item
        parentNavItem = Array.from(sidebarNav.querySelectorAll('.nav-item')).find(item => 
            item.textContent.trim() === 'Enterprise applications'
        );
    } else if (config.type === 'App registrations') {
        // Find "App registrations" nav-item
        parentNavItem = Array.from(sidebarNav.querySelectorAll('.nav-item')).find(item => 
            item.textContent.trim() === 'App registrations'
        );
    } else if (config.type === 'Group' || config.type === 'Security Group' || config.type === 'Distribution Group' || config.type === 'Microsoft 365 Group') {
        // Find "Groups" nav-item
        parentNavItem = Array.from(sidebarNav.querySelectorAll('.nav-item')).find(item => 
            item.textContent.trim() === 'Groups'
        );
    }
    
    if (!parentNavItem) return;
    
    // Add visual indicator that parent is expanded
    parentNavItem.classList.add('expanded');
    
    // Create sub-header with app/group name
    const subHeader = document.createElement('div');
    subHeader.className = 'nav-sub-header';
    subHeader.innerHTML = `
        <div class="nav-item-title">${config.name}</div>
        <div class="nav-item-subtitle">${config.type}</div>
    `;
    
    // Create container for sub-items
    const subItemsContainer = document.createElement('div');
    subItemsContainer.className = 'nav-sub-items';
    
    // Add sub-navigation items
    config.items.forEach(item => {
        const navItem = document.createElement('div');
        navItem.className = `nav-sub-item ${item.active ? 'active' : ''}`;
        navItem.onclick = item.onClick;
        navItem.innerHTML = `
            <i class="${item.icon}"></i>
            <span>${item.label}</span>
        `;
        subItemsContainer.appendChild(navItem);
    });
    
    // Insert sub-header and sub-items after the parent nav-item
    parentNavItem.insertAdjacentElement('afterend', subItemsContainer);
    parentNavItem.insertAdjacentElement('afterend', subHeader);
}

function clearSubNavigation() {
    const sidebarNav = document.getElementById('sidebar-nav');
    
    // Clear any existing sub-items and headers
    sidebarNav.querySelectorAll('.nav-sub-item, .nav-sub-header, .nav-sub-items').forEach(item => {
        item.remove();
    });
    
    // Remove expanded class from all nav-items
    sidebarNav.querySelectorAll('.nav-item.expanded').forEach(item => {
        item.classList.remove('expanded');
    });
}

// Page Navigation Functions
function showTenantOverview() {
    currentPage = 'tenant-overview';
    updateBreadcrumb([
        { text: 'Overview' }
    ]);
    updateNavigation('tenant-overview');
    clearSubNavigation(); // Clear any app/group sub-navigation
      const content = `
        <div class="page-container">
            <div class="page-header">
                <h1 class="page-title">${tenantData.name}</h1>
                <p class="page-subtitle">Tenant ID: ${tenantData.domain}</p>            </div>
            
            <div class="config-sections">
                <div class="config-section">
                    <div class="config-section-header">
                        <h2 class="section-title">General</h2>
                        <p class="section-description">Basic tenant configuration</p>
                    </div>
                    <div class="config-grid">
                        <div class="config-item">
                            <div class="config-label">Tenant name</div>
                            <div class="config-value">${tenantData.name}</div>
                        </div>
                        <div class="config-item">
                            <div class="config-label">Primary domain</div>
                            <div class="config-value">${tenantData.domain}</div>
                        </div>
                        <div class="config-item">
                            <div class="config-label">Tenant type</div>
                            <div class="config-value">Azure AD</div>
                        </div>
                        <div class="config-item">
                            <div class="config-label">Country/Region</div>
                            <div class="config-value">United States</div>
                        </div>
                    </div>
                </div>
            </div>

            <br>

            <div class="overview-grid">
                <div class="overview-card" onclick="showEnterpriseApps()">
                    <div class="card-header">
                        <div class="card-icon blue">
                            <i class="fas fa-th-large"></i>
                        </div>
                        <div class="card-title">Enterprise applications</div>
                    </div>
                    <p class="card-description">
                        Manage applications that your users can access. Configure SSO, assign users, and monitor usage.
                    </p>
                    <div class="card-stats">
                        <div class="stat-item">
                            <div class="stat-number">${enterpriseApps.length}</div>
                            <div class="stat-label">Total Apps</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">${enterpriseApps.reduce((sum, app) => sum + app.users, 0)}</div>
                            <div class="stat-label">Users</div>
                        </div>
                    </div>
                </div>
                
                <div class="overview-card" onclick="showAppRegistrations()">
                    <div class="card-header">
                        <div class="card-icon green">
                            <i class="fas fa-cube"></i>
                        </div>
                        <div class="card-title">App registrations</div>
                    </div>
                    <p class="card-description">
                        Register and configure applications to integrate with Microsoft identity platform.
                    </p>
                    <div class="card-stats">
                        <div class="stat-item">
                            <div class="stat-number">${appRegistrations.length}</div>
                            <div class="stat-label">Registrations</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">${appRegistrations.filter(app => app.owners.length === 0).length}</div>
                            <div class="stat-label">Orphaned</div>
                        </div>
                    </div>
                </div>
                
                <div class="overview-card">
                    <div class="card-header">
                        <div class="card-icon purple">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="card-title">Users</div>
                    </div>
                    <p class="card-description">
                        Manage user accounts, profiles, and access to applications and resources.
                    </p>
                    <div class="card-stats">
                        <div class="stat-item">
                            <div class="stat-number">${tenantData.users}</div>
                            <div class="stat-label">Total Users</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">${tenantData.groups}</div>
                            <div class="stat-label">Groups</div>
                        </div>
                    </div>
                </div>
                
                <div class="overview-card">
                    <div class="card-header">
                        <div class="card-icon orange">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <div class="card-title">Security</div>
                    </div>
                    <p class="card-description">
                        Monitor security events, configure conditional access, and protect your organization.
                    </p>
                    <div class="card-stats">
                        <div class="stat-item">
                            <div class="stat-number">${tenantData.devices}</div>
                            <div class="stat-label">Devices</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">12</div>
                            <div class="stat-label">Policies</div>
                        </div>                    </div>
                </div>            </div>
            
        </div>
    `;    document.getElementById('main-content').innerHTML = content;
    
    // Ensure modal functions are globally accessible after dynamic content update
    window.addOwner = addOwner;
    window.closeAddOwnerModal = closeAddOwnerModal;
    window.addSelectedOwners = addSelectedOwners;
    window.removeSelectedOwner = removeSelectedOwner;
    window.searchPotentialOwners = searchPotentialOwners;
    window.updateSearchResults = updateSearchResults;
    window.updateSelectedOwners = updateSelectedOwners;    window.removeOwner = removeOwner;
}

function showTenantConfiguration() {
    currentPage = 'tenant-configuration';
    updateBreadcrumb([
        { text: 'Overview', onClick: 'showTenantOverview()' },
        { text: 'Tenant configuration' }
    ]);
    updateNavigation('tenant-configuration');
    clearSubNavigation(); // Clear any app/group sub-navigation
    
    const content = `
        <div class="page-container">
            <div class="page-header">
                <h1 class="page-title">Tenant configuration</h1>
                <p class="page-subtitle">Configure tenant-wide settings and policies</p>
            </div>
              <div class="config-sections">
                <div class="config-section">
                    <div class="config-section-header">
                        <h2 class="section-title">Owner Management Policies</h2>
                        <p class="section-description">Configure how application and group ownership is managed</p>
                    </div>                    <div class="config-policies">
                        <div class="policy-item">
                            <div class="policy-header">
                                <div class="policy-title">Orphaned resource alerts</div>
                                <label class="toggle-switch">
                                    <input type="checkbox" checked>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                            <p class="policy-description">Send notifications when applications or groups have no owners assigned</p>
                        </div>
                    </div>
                </div>

                <div class="config-section">
                    <div class="config-section-header">
                        <h2 class="section-title">Security Settings</h2>
                        <p class="section-description">Configure security and compliance options</p>
                    </div>
                    <div class="config-grid">
                        <div class="config-item">
                            <div class="config-label">Multi-factor authentication</div>
                            <div class="config-value">
                                <span class="status-badge enabled">Enabled</span>
                            </div>
                        </div>
                        <div class="config-item">
                            <div class="config-label">Conditional access</div>
                            <div class="config-value">
                                <span class="status-badge enabled">12 policies</span>
                            </div>
                        </div>
                        <div class="config-item">
                            <div class="config-label">Identity protection</div>
                            <div class="config-value">
                                <span class="status-badge enabled">Enabled</span>
                            </div>
                        </div>
                        <div class="config-item">
                            <div class="config-label">Security defaults</div>
                            <div class="config-value">
                                <span class="status-badge disabled">Disabled</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('main-content').innerHTML = content;
}

// Make the function globally accessible
window.showTenantConfiguration = showTenantConfiguration;

function showGroups() {
    currentPage = 'groups';
    updateBreadcrumb([
        { text: 'Overview', onClick: 'showTenantOverview()' },
        { text: 'Identity' },
        { text: 'Groups' }
    ]);
    updateNavigation('groups');
    clearSubNavigation(); // Clear any app/group sub-navigation
    
    const content = `
        <div class="page-container">
            <div class="app-list-header">
                <div>
                    <h1 class="page-title">Groups</h1>
                    <p class="page-subtitle">Manage security groups and Microsoft 365 groups</p>
                </div>
                <div class="header-actions">
                    <button class="btn btn-primary">
                        <i class="fas fa-plus"></i>
                        New group
                    </button>
                </div>
            </div>
              <div class="app-list-filters">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Search groups" onkeyup="filterGroups(this.value)">
                </div>
                <div class="filter-dropdown">
                    <select onchange="filterGroupsByType(this.value)">
                        <option value="">All group types</option>
                        <option value="Security">Security</option>
                        <option value="Microsoft 365">Microsoft 365</option>
                    </select>
                </div>
                <div class="filter-dropdown">
                    <select onchange="filterGroupsByMembership(this.value)">
                        <option value="">All membership types</option>
                        <option value="Assigned">Assigned</option>
                        <option value="Dynamic">Dynamic</option>
                    </select>
                </div>
            </div>
            
            <div class="app-table-container">
                <table class="app-table">
                    <thead>
                        <tr>
                            <th>Group name</th>
                            <th>Description</th>
                            <th>Group type</th>
                            <th>Membership type</th>
                            <th>Members</th>
                            <th>Owners</th>
                        </tr>
                    </thead>                    <tbody id="groups-tbody">                        ${generateGroupsRows()}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    document.getElementById('main-content').innerHTML = content;
    
    // Ensure modal functions are globally accessible after dynamic content update
    window.addOwner = addOwner;
    window.closeAddOwnerModal = closeAddOwnerModal;
    window.addSelectedOwners = addSelectedOwners;
    window.removeSelectedOwner = removeSelectedOwner;
    window.searchPotentialOwners = searchPotentialOwners;
    window.updateSearchResults = updateSearchResults;
    window.updateSelectedOwners = updateSelectedOwners;
    window.removeOwner = removeOwner;
}

function showEnterpriseApps() {
    currentPage = 'enterprise-apps';
    updateBreadcrumb([
        { text: 'Overview', onClick: 'showTenantOverview()' },
        { text: 'Applications' },
        { text: 'Enterprise applications' }
    ]);
    updateNavigation('enterprise-apps');
    clearSubNavigation(); // Clear any app/group sub-navigation
    
    const content = `
        <div class="page-container">
            <div class="app-list-header">
                <div>
                    <h1 class="page-title">Enterprise applications</h1>
                    <p class="page-subtitle">Manage applications for single sign-on and user access</p>
                </div>
                <div class="header-actions">
                    <button class="btn btn-secondary">
                        <i class="fas fa-download"></i> Export
                    </button>
                    <button class="btn btn-primary">
                        <i class="fas fa-plus"></i> New application
                    </button>
                </div>
            </div>
            
            <div class="filter-bar">
                <div class="search-container">
                    <i class="fas fa-search"></i>
                    <input type="text" class="search-input" placeholder="Search by name or identifier" onkeyup="filterApps('enterprise', this.value)">
                </div>
                <select class="filter-dropdown" onchange="filterByType('enterprise', this.value)">
                    <option value="all">All application types</option>
                    <option value="gallery">Gallery</option>
                    <option value="non-gallery">Non-gallery</option>
                </select>
                <select class="filter-dropdown">
                    <option>All statuses</option>
                    <option>Enabled</option>
                    <option>Disabled</option>
                </select>
            </div>
            
            <div class="app-table-container">
                <table class="app-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Application ID</th>
                            <th>Application type</th>
                            <th>Status</th>
                            <th>Users</th>
                            <th>Last sign-in</th>
                        </tr>
                    </thead>                    <tbody id="enterprise-apps-tbody">
                        ${generateEnterpriseAppsRows()}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    document.getElementById('main-content').innerHTML = content;
    
    // Ensure modal functions are globally accessible after dynamic content update
    window.addOwner = addOwner;
    window.closeAddOwnerModal = closeAddOwnerModal;
    window.addSelectedOwners = addSelectedOwners;
    window.removeSelectedOwner = removeSelectedOwner;
    window.searchPotentialOwners = searchPotentialOwners;
    window.updateSearchResults = updateSearchResults;
    window.updateSelectedOwners = updateSelectedOwners;
    window.removeOwner = removeOwner;
}

function showAppRegistrations() {
    currentPage = 'app-registrations';
    updateBreadcrumb([
        { text: 'Overview', onClick: 'showTenantOverview()' },
        { text: 'Applications' },
        { text: 'App registrations' }
    ]);
    updateNavigation('app-registrations');
    clearSubNavigation(); // Clear any app/group sub-navigation
    
    const content = `
        <div class="page-container">
            <div class="app-list-header">
                <div>
                    <h1 class="page-title">App registrations</h1>
                    <p class="page-subtitle">Register applications to integrate with Microsoft identity platform</p>
                </div>
                <div class="header-actions">
                    <button class="btn btn-secondary">
                        <i class="fas fa-download"></i> Export
                    </button>
                    <button class="btn btn-primary">
                        <i class="fas fa-plus"></i> New registration
                    </button>
                </div>
            </div>
            
            <div class="filter-bar">
                <div class="search-container">
                    <i class="fas fa-search"></i>
                    <input type="text" class="search-input" placeholder="Search by name, application ID, or object ID" onkeyup="filterApps('registration', this.value)">
                </div>
                <select class="filter-dropdown" onchange="filterByOwnership(this.value)">
                    <option value="all">All applications</option>
                    <option value="owned">Applications I own</option>
                    <option value="orphaned">Orphaned applications</option>
                </select>
                <select class="filter-dropdown">
                    <option>All statuses</option>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
            </div>
            
            <div class="app-table-container">
                <table class="app-table">
                    <thead>
                        <tr>
                            <th>Display name</th>
                            <th>Application (client) ID</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th>Owners</th>
                        </tr>
                    </thead>
                    <tbody id="app-registrations-tbody">                        ${generateAppRegistrationsRows()}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    document.getElementById('main-content').innerHTML = content;
    
    // Ensure modal functions are globally accessible after dynamic content update
    window.addOwner = addOwner;
    window.closeAddOwnerModal = closeAddOwnerModal;
    window.addSelectedOwners = addSelectedOwners;
    window.removeSelectedOwner = removeSelectedOwner;
    window.searchPotentialOwners = searchPotentialOwners;
    window.updateSearchResults = updateSearchResults;
    window.updateSelectedOwners = updateSelectedOwners;
    window.removeOwner = removeOwner;
}

function generateEnterpriseAppsRows() {
    return enterpriseApps.map(app => `
        <tr>
            <td>
                <span class="app-name" onclick="showAppOverview('enterprise', '${app.id}')">${app.name}</span>
            </td>
            <td><code class="app-id">${app.appId}</code></td>
            <td>${app.type}</td>
            <td><span class="text-primary">${app.status}</span></td>
            <td>${app.users.toLocaleString()}</td>
            <td>${app.lastSignIn}</td>
        </tr>
    `).join('');
}

function generateAppRegistrationsRows() {
    return appRegistrations.map(app => `
        <tr>
            <td>
                <span class="app-name" onclick="showAppOverview('registration', '${app.id}')">${app.name}</span>
            </td>
            <td><code class="app-id">${app.clientId}</code></td>
            <td><span class="text-primary">${app.status}</span></td>
            <td>${app.created}</td>
            <td>                ${app.owners.length > 0 
                    ? app.owners.map(owner => `<span class="text-muted">${owner.name}</span>`).join(', ')
                    : '<span style="color: #d13438; font-style: italic;">No owners</span>'
                }
            </td>
        </tr>
    `).join('');
}

function generateGroupsRows() {
    return groups.map(group => `
        <tr>
            <td>
                <span class="app-name" onclick="showGroupOverview('${group.id}')">${group.name}</span>
            </td>
            <td>
                <span class="text-muted">${group.description}</span>
            </td>
            <td>
                <span class="badge ${getBadgeClass(group.type)}">${group.type}</span>
            </td>
            <td>
                <span class="text-muted">${group.membershipType}</span>
            </td>
            <td>
                <span class="text-primary">${group.members.toLocaleString()}</span>
            </td>
            <td>
                ${group.owners.length > 0 
                    ? group.owners.map(owner => `<span class="text-muted">${owner.name}</span>`).join(', ')
                    : '<span style="color: #d13438; font-style: italic;">No owners</span>'
                }
            </td>
        </tr>
    `).join('');
}

function getBadgeClass(groupType) {
    switch (groupType) {
        case 'Security':
            return 'badge-security';
        case 'Microsoft 365':
            return 'badge-m365';
        case 'Role-assignable security':
            return 'badge-role-assignable';
        default:
            return 'badge-security';
    }
}

function showAppOverview(appType, appId) {
    const app = appType === 'enterprise' 
        ? enterpriseApps.find(a => a.id === appId)
        : appRegistrations.find(a => a.id === appId);
    
    if (!app) return;
      
    currentApp = { type: appType, data: app };
    currentPage = 'app-overview';
    
    const typeLabel = appType === 'enterprise' ? 'Enterprise applications' : 'App registrations';
    const typeFunction = appType === 'enterprise' ? 'showEnterpriseApps()' : 'showAppRegistrations()';
    
    updateBreadcrumb([
        { text: 'Overview', onClick: 'showTenantOverview()' },
        { text: 'Applications' },
        { text: typeLabel, onClick: typeFunction },
        { text: app.name },
        { text: 'Overview' }
    ]);
    
    // Update sidebar with app sub-navigation
    updateSidebarNavigation({
        name: app.name,
        type: typeLabel,
        items: [
            { label: 'Overview', icon: 'fas fa-info-circle', active: true, onClick: () => showAppOverview(appType, appId) },
            { label: 'Owners', icon: 'fas fa-users-cog', active: false, onClick: () => showAppOwnersPage(appType, appId) },
            ...(appType === 'registration' ? [{ label: 'API permissions', icon: 'fas fa-key', active: false, onClick: () => showAppPermissionsPage(appType, appId) }] : []),
            ...(appType === 'enterprise' ? [{ label: 'Users and groups', icon: 'fas fa-users', active: false, onClick: () => showAppUsersPage(appType, appId) }] : [])
        ]
    });
    
    const content = `
        <div class="page-container">
            <div class="app-overview-header">
                <h1 class="app-overview-title">${app.name}</h1>
                <p class="app-overview-subtitle">Application ID: ${app.appId || app.clientId}</p>
                <div class="app-metadata">
                    <span class="badge">${app.type || app.status}</span>
                    <span class="text-muted">Status: ${app.status}</span>
                </div>
            </div>
            
            <div class="app-content">
                ${generateAppOverviewContent(app, appType)}
            </div>
        </div>
    `;
    
    document.getElementById('main-content').innerHTML = content;
    
    // Ensure modal functions are globally accessible after dynamic content update
    window.addOwner = addOwner;
    window.closeAddOwnerModal = closeAddOwnerModal;
    window.addSelectedOwners = addSelectedOwners;
    window.removeSelectedOwner = removeSelectedOwner;
    window.searchPotentialOwners = searchPotentialOwners;
    window.updateSearchResults = updateSearchResults;
    window.updateSelectedOwners = updateSelectedOwners;
    window.removeOwner = removeOwner;
}

// New separate page functions for app sections
function showAppOwnersPage(appType, appId) {
    const app = appType === 'enterprise' 
        ? enterpriseApps.find(a => a.id === appId)
        : appRegistrations.find(a => a.id === appId);
    
    if (!app) return;
    
    currentApp = { type: appType, data: app };
    currentPage = 'app-owners';
    
    const typeLabel = appType === 'enterprise' ? 'Enterprise applications' : 'App registrations';
    const typeFunction = appType === 'enterprise' ? 'showEnterpriseApps()' : 'showAppRegistrations()';
    
    updateBreadcrumb([
        { text: 'Overview', onClick: 'showTenantOverview()' },
        { text: 'Applications' },
        { text: typeLabel, onClick: typeFunction },
        { text: app.name, onClick: `showAppOverview('${appType}', '${appId}')` },
        { text: 'Owners' }
    ]);
    
    // Update sidebar with app sub-navigation
    updateSidebarNavigation({
        name: app.name,
        type: typeLabel,
        items: [
            { label: 'Overview', icon: 'fas fa-info-circle', active: false, onClick: () => showAppOverview(appType, appId) },
            { label: 'Owners', icon: 'fas fa-users-cog', active: true, onClick: () => showAppOwnersPage(appType, appId) },
            ...(appType === 'registration' ? [{ label: 'API permissions', icon: 'fas fa-key', active: false, onClick: () => showAppPermissionsPage(appType, appId) }] : []),
            ...(appType === 'enterprise' ? [{ label: 'Users and groups', icon: 'fas fa-users', active: false, onClick: () => showAppUsersPage(appType, appId) }] : [])
        ]
    });
    
    const ownersContent = app.owners.length > 0 
        ? `
            <div class="app-table-container">
                <table class="app-table">
                    <thead>
                        <tr>
                            <th>Owner</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>                        ${app.owners.map(owner => `
                            <tr>
                                <td>
                                    <div class="owner-display">
                                        ${getOwnerAvatarHtml(owner)}
                                        <span class="owner-name">${owner.name}</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="owner-email">${owner.email}</span>                                </td>
                                <td>
                                    <span class="owner-type ${(owner.type || 'Owner').toLowerCase().replace(/ /g, '-')}">${owner.type || 'Owner'}</span>
                                </td>                                <td>
                                    <div class="owner-actions">
                                        <button class="action-btn" onclick="console.log('🔧 App Edit button clicked for owner:', '${owner.id}'); editOwnerType('${owner.id}')" title="Edit owner type">
                                            <i class="fas fa-pencil-alt"></i>
                                        </button>
                                        <button class="action-btn" onclick="removeOwner('${owner.id}')" title="Remove owner">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `
        : `
            <div class="empty-state">
                <i class="fas fa-user-times"></i>
                <h3>No owners assigned</h3>
                <p>This application doesn't have any owners. Add an owner to manage this application.</p>
            </div>
        `;
      const content = `
        <div class="page-container">
            <div class="owners-header">
                <h1 class="page-title">Owners</h1>
                <p class="page-subtitle">Manage who can configure and administer this application</p>
                <div class="header-actions">
                    <button class="btn btn-primary" onclick="addOwner()">
                        <i class="fas fa-plus"></i> Add owner
                    </button>
                </div>
            </div>
            
            ${ownersContent}
            
            <div class="owner-types-info">
                <h3 class="info-title">Owner Types & Permissions</h3>
                <div class="owner-type-grid">
                    <div class="owner-type-card">
                        <div class="owner-type-header">
                            <span class="owner-type-badge contact">Contact</span>
                        </div>
                        <div class="owner-type-description">
                            <p><strong>Eligibility:</strong> Users, Groups</p>
                            <p><strong>Permissions:</strong> Read-only access to application information. Cannot modify apps or make any changes to configuration.</p>
                        </div>
                    </div>
                    
                    <div class="owner-type-card">
                        <div class="owner-type-header">
                            <span class="owner-type-badge sponsor">Sponsor</span>
                        </div>
                        <div class="owner-type-description">
                            <p><strong>Eligibility:</strong> Users, Groups</p>
                            <p><strong>Permissions:</strong> Authorized for lifecycle management including enable/disable application and soft delete/restore operations.</p>
                        </div>
                    </div>
                    
                    <div class="owner-type-card">
                        <div class="owner-type-header">
                            <span class="owner-type-badge technical-owner">Technical Owner</span>
                        </div>
                        <div class="owner-type-description">
                            <p><strong>Eligibility:</strong> Users, Groups</p>
                            <p><strong>Permissions:</strong> Can modify application configuration, certificates, and technical settings. Cannot add other owners, assign users/groups, or grant permissions.</p>
                        </div>
                    </div>
                    
                    <div class="owner-type-card">
                        <div class="owner-type-header">
                            <span class="owner-type-badge full-owner">Full Owner</span>
                        </div>
                        <div class="owner-type-description">
                            <p><strong>Eligibility:</strong> Users only</p>
                            <p><strong>Permissions:</strong> Complete administrative control including all configuration changes, user/group assignments, permission grants, and owner management.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('main-content').innerHTML = content;
    
    // Ensure modal functions are globally accessible
    window.addOwner = addOwner;
    window.closeAddOwnerModal = closeAddOwnerModal;
    window.addSelectedOwners = addSelectedOwners;
    window.removeSelectedOwner = removeSelectedOwner;
    window.searchPotentialOwners = searchPotentialOwners;
    window.updateSearchResults = updateSearchResults;
    window.updateSelectedOwners = updateSelectedOwners;
    window.removeOwner = removeOwner;
}

function showAppPermissionsPage(appType, appId) {
    const app = appType === 'enterprise' 
        ? enterpriseApps.find(a => a.id === appId)
        : appRegistrations.find(a => a.id === appId);
    
    if (!app) return;
    
    currentApp = { type: appType, data: app };
    currentPage = 'app-permissions';
    
    const typeLabel = appType === 'enterprise' ? 'Enterprise applications' : 'App registrations';
    const typeFunction = appType === 'enterprise' ? 'showEnterpriseApps()' : 'showAppRegistrations()';
    
    updateBreadcrumb([
        { text: 'Overview', onClick: 'showTenantOverview()' },
        { text: 'Applications' },
        { text: typeLabel, onClick: typeFunction },
        { text: app.name, onClick: `showAppOverview('${appType}', '${appId}')` },
        { text: 'API permissions' }
    ]);
    
    // Update sidebar with app sub-navigation
    updateSidebarNavigation({
        name: app.name,
        type: typeLabel,
        items: [
            { label: 'Overview', icon: 'fas fa-info-circle', active: false, onClick: () => showAppOverview(appType, appId) },
            { label: 'Owners', icon: 'fas fa-users-cog', active: false, onClick: () => showAppOwnersPage(appType, appId) },
            { label: 'API permissions', icon: 'fas fa-key', active: true, onClick: () => showAppPermissionsPage(appType, appId) }
        ]
    });
    
    const content = `
        <div class="page-container">
            <div class="page-header">
                <h1 class="page-title">API permissions</h1>
                <p class="page-subtitle">Configure the permissions this application requires</p>
            </div>
            
            <div class="info-section">
                <div class="app-table-container">
                    <table class="app-table">
                        <thead>
                            <tr>
                                <th>API / Permissions name</th>
                                <th>Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${app.apiPermissions.map(permission => `
                                <tr>
                                    <td>${permission}</td>
                                    <td>Delegated</td>
                                    <td><span class="text-primary">Granted</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('main-content').innerHTML = content;
}

function showAppUsersPage(appType, appId) {
    const app = appType === 'enterprise' 
        ? enterpriseApps.find(a => a.id === appId)
        : appRegistrations.find(a => a.id === appId);
    
    if (!app) return;
    
    currentApp = { type: appType, data: app };
    currentPage = 'app-users';
    
    const typeLabel = appType === 'enterprise' ? 'Enterprise applications' : 'App registrations';
    const typeFunction = appType === 'enterprise' ? 'showEnterpriseApps()' : 'showAppRegistrations()';
    
    updateBreadcrumb([
        { text: 'Overview', onClick: 'showTenantOverview()' },
        { text: 'Applications' },
        { text: typeLabel, onClick: typeFunction },
        { text: app.name, onClick: `showAppOverview('${appType}', '${appId}')` },
        { text: 'Users and groups' }
    ]);
    
    // Update sidebar with app sub-navigation
    updateSidebarNavigation({
        name: app.name,
        type: typeLabel,
        items: [
            { label: 'Overview', icon: 'fas fa-info-circle', active: false, onClick: () => showAppOverview(appType, appId) },
            { label: 'Owners', icon: 'fas fa-users-cog', active: false, onClick: () => showAppOwnersPage(appType, appId) },
            { label: 'Users and groups', icon: 'fas fa-users', active: true, onClick: () => showAppUsersPage(appType, appId) }
        ]
    });
    
    const content = `
        <div class="page-container">
            <div class="page-header">
                <h1 class="page-title">Users and groups</h1>
                <p class="page-subtitle">Manage user and group assignments for this application</p>
            </div>
            
            <div class="info-section">
                <h2 class="section-title">Assignment summary</h2>
                <p class="text-muted">${app.users} users assigned to this application</p>
            </div>
        </div>
    `;
    
    document.getElementById('main-content').innerHTML = content;
}

function generateAppOverviewContent(app, appType) {
    if (appType === 'enterprise') {
        return `
            <div class="info-section">
                <h2 class="section-title">Basic information</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Name</div>
                        <div class="info-value">${app.name}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Application ID</div>
                        <div class="info-value"><code>${app.appId}</code></div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Application type</div>
                        <div class="info-value">${app.type}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Status</div>
                        <div class="info-value text-primary">${app.status}</div>
                    </div>
                </div>
            </div>
            
            <div class="info-section">
                <h2 class="section-title">Usage</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Assigned users</div>
                        <div class="info-value">${app.users.toLocaleString()}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Last sign-in</div>
                        <div class="info-value">${app.lastSignIn}</div>
                    </div>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="info-section">
                <h2 class="section-title">Essentials</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Display name</div>
                        <div class="info-value">${app.name}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Application (client) ID</div>
                        <div class="info-value"><code>${app.clientId}</code></div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Status</div>
                        <div class="info-value text-primary">${app.status}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Created</div>
                        <div class="info-value">${app.created}</div>
                    </div>
                </div>
            </div>
            
            <div class="info-section">
                <h2 class="section-title">Configuration</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Redirect URIs</div>
                        <div class="info-value">
                            ${app.redirectUris.length > 0 
                                ? app.redirectUris.map(uri => `<div><code>${uri}</code></div>`).join('')
                                : 'None configured'
                            }
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">API permissions</div>
                        <div class="info-value">
                            ${app.apiPermissions.map(perm => `<div>${perm}</div>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}






// Group management functions
function filterGroups(searchTerm) {
    const rows = document.querySelectorAll('#groups-tbody tr');
    rows.forEach(row => {
        const groupName = row.querySelector('.app-name').textContent.toLowerCase();
        const description = row.querySelector('.text-muted').textContent.toLowerCase();
        const matches = groupName.includes(searchTerm.toLowerCase()) || 
                       description.includes(searchTerm.toLowerCase());
        row.style.display = matches ? 'table-row' : 'none';
    });
}

function filterGroupsByType(filterValue) {
    const rows = document.querySelectorAll('#groups-tbody tr');
    rows.forEach(row => {
        const badge = row.querySelector('.badge');
        const groupType = badge ? badge.textContent : '';
        const matches = !filterValue || groupType === filterValue;
        row.style.display = matches ? 'table-row' : 'none';
    });
}

function filterGroupsByMembership(filterValue) {
    const rows = document.querySelectorAll('#groups-tbody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const membershipType = cells[3] ? cells[3].textContent.trim() : '';
        const matches = !filterValue || membershipType === filterValue;
        row.style.display = matches ? 'table-row' : 'none';
    });
}

function showGroupOverview(groupId) {
    const group = groups.find(g => g.id === groupId);
    if (!group) return;
      
    currentGroup = group;
    currentPage = 'group-overview';
    
    updateBreadcrumb([
        { text: 'Overview', onClick: 'showTenantOverview()' },
        { text: 'Identity' },
        { text: 'Groups', onClick: 'showGroups()' },
        { text: group.name },
        { text: 'Overview' }
    ]);
    
    // Update sidebar with group sub-navigation
    updateSidebarNavigation({
        name: group.name,
        type: 'Group',
        items: [
            { label: 'Overview', icon: 'fas fa-info-circle', active: true, onClick: () => showGroupOverview(groupId) },
            { label: 'Members', icon: 'fas fa-users', active: false, onClick: () => showGroupMembersPage(groupId) },
            { label: 'Owners', icon: 'fas fa-users-cog', active: false, onClick: () => showGroupOwnersPage(groupId) }
        ]
    });
    
    const content = `
        <div class="page-container">
            <div class="app-overview-header">
                <h1 class="app-overview-title">${group.name}</h1>
                <p class="app-overview-subtitle">${group.description}</p>
                <div class="app-metadata">
                    <span class="badge ${getBadgeClass(group.type)}">${group.type}</span>
                    <span class="text-muted">Created: ${group.created}</span>
                    <span class="text-muted">Members: ${group.members.toLocaleString()}</span>
                </div>
            </div>
            
            <div class="app-content">
                ${renderGroupOverviewTab(group)}
            </div>
        </div>
    `;
    
    document.getElementById('main-content').innerHTML = content;
    
    // Ensure modal functions are globally accessible after dynamic content update
    window.addOwner = addOwner;
    window.closeAddOwnerModal = closeAddOwnerModal;
    window.addSelectedOwners = addSelectedOwners;
    window.removeSelectedOwner = removeSelectedOwner;
    window.searchPotentialOwners = searchPotentialOwners;
    window.updateSearchResults = updateSearchResults;
    window.updateSelectedOwners = updateSelectedOwners;
    window.removeOwner = removeOwner;
}

// New separate page functions for group sections
function showGroupMembersPage(groupId) {
    const group = groups.find(g => g.id === groupId);
    if (!group) return;
    
    currentGroup = group;
    currentPage = 'group-members';
    
    updateBreadcrumb([
        { text: 'Overview', onClick: 'showTenantOverview()' },
        { text: 'Identity' },
        { text: 'Groups', onClick: 'showGroups()' },
        { text: group.name, onClick: `showGroupOverview('${groupId}')` },
        { text: 'Members' }
    ]);
    
    // Update sidebar with group sub-navigation
    updateSidebarNavigation({
        name: group.name,
        type: 'Group',
        items: [
            { label: 'Overview', icon: 'fas fa-info-circle', active: false, onClick: () => showGroupOverview(groupId) },
            { label: 'Members', icon: 'fas fa-users', active: true, onClick: () => showGroupMembersPage(groupId) },
            { label: 'Owners', icon: 'fas fa-users-cog', active: false, onClick: () => showGroupOwnersPage(groupId) }
        ]
    });
    
    const content = `
        <div class="page-container">
            <div class="members-header">
                <h1 class="page-title">Members</h1>
                <p class="page-subtitle">Manage group membership (${group.members.toLocaleString()} members)</p>
                <div class="header-actions">
                    <button class="btn btn-primary">
                        <i class="fas fa-plus"></i> Add member
                    </button>
                </div>
            </div>
            
            <div class="placeholder-content">
                <i class="fas fa-users" style="font-size: 48px; color: #ccc; margin-bottom: 16px;"></i>
                <p>Member management functionality would be implemented here</p>
            </div>
        </div>
    `;
    
    document.getElementById('main-content').innerHTML = content;
}

function showGroupOwnersPage(groupId) {
    const group = groups.find(g => g.id === groupId);
    if (!group) return;
    
    currentGroup = group;
    currentPage = 'group-owners';
    
    updateBreadcrumb([
        { text: 'Overview', onClick: 'showTenantOverview()' },
        { text: 'Identity' },
        { text: 'Groups', onClick: 'showGroups()' },
        { text: group.name, onClick: `showGroupOverview('${groupId}')` },
        { text: 'Owners' }
    ]);
    
    // Update sidebar with group sub-navigation
    updateSidebarNavigation({
        name: group.name,
        type: 'Group',
        items: [
            { label: 'Overview', icon: 'fas fa-info-circle', active: false, onClick: () => showGroupOverview(groupId) },
            { label: 'Members', icon: 'fas fa-users', active: false, onClick: () => showGroupMembersPage(groupId) },
            { label: 'Owners', icon: 'fas fa-users-cog', active: true, onClick: () => showGroupOwnersPage(groupId) }
        ]
    });
    
    const ownersContent = group.owners.length > 0 ? `
        <div class="app-table-container">
            <table class="app-table">
                <thead>
                    <tr>
                        <th>Owner</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>                <tbody>
                    ${group.owners.map(owner => `
                        <tr>
                            <td>
                                <div class="owner-display">
                                    ${getOwnerAvatarHtml(owner)}
                                    <span class="owner-name">${owner.name}</span>
                                </div>
                            </td>
                            <td>
                                <span class="owner-email">${owner.email}</span>
                            </td>
                            <td>
                                <span class="owner-type">${owner.type || 'Owner'}</span>
                            </td>
                            <td>
                                <div class="owner-actions">
                                    <button class="action-btn" onclick="console.log('🔧 Group Edit button clicked for owner:', '${owner.id}'); editOwnerType('${owner.id}')" title="Edit owner type">
                                        <i class="fas fa-pencil-alt"></i>
                                    </button>
                                    <button class="action-btn" onclick="removeOwner('${owner.id}')" title="Remove owner">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    ` : `
        <div class="no-owners">
            <i class="fas fa-user-slash" style="font-size: 48px; color: #ccc; margin-bottom: 16px;"></i>
            <p>This group has no owners assigned</p>
            <button class="btn btn-primary" onclick="addOwner()">Add owner</button>
        </div>
    `;
    
    const content = `
        <div class="page-container">
            <div class="owners-header">
                <h1 class="page-title">Owners</h1>
                <p class="page-subtitle">Manage who can configure and administer this group</p>
                <div class="header-actions">
                    <button class="btn btn-primary" onclick="addOwner()">
                        <i class="fas fa-plus"></i> Add owner
                    </button>
                </div>
            </div>
            
            ${ownersContent}
        </div>
    `;
    
    document.getElementById('main-content').innerHTML = content;
    
    // Ensure modal functions are globally accessible
    window.addOwner = addOwner;
    window.closeAddOwnerModal = closeAddOwnerModal;
    window.addSelectedOwners = addSelectedOwners;
    window.removeSelectedOwner = removeSelectedOwner;
    window.searchPotentialOwners = searchPotentialOwners;
    window.updateSearchResults = updateSearchResults;
    window.updateSelectedOwners = updateSelectedOwners;
    window.removeOwner = removeOwner;
}



function renderGroupOverviewTab(group) {
    return `
        <div class="overview-content">
            <div class="overview-section">
                <h3>Group Information</h3>
                <div class="property-grid">
                    <div class="property-row">
                        <label>Group name:</label>
                        <span>${group.name}</span>
                    </div>
                    <div class="property-row">
                        <label>Description:</label>
                        <span>${group.description}</span>
                    </div>
                    <div class="property-row">
                        <label>Group type:</label>
                        <span>${group.type}</span>
                    </div>
                    <div class="property-row">
                        <label>Membership type:</label>
                        <span>${group.membershipType}</span>
                    </div>
                    <div class="property-row">
                        <label>Created:</label>
                        <span>${group.created}</span>
                    </div>
                    <div class="property-row">
                        <label>Members:</label>
                        <span>${group.members.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderGroupMembersTab(group) {
    return `
        <div class="members-content">
            <div class="members-header">
                <h3>Members (${group.members.toLocaleString()})</h3>
                <button class="btn btn-primary">Add member</button>
            </div>
            <div class="placeholder-content">
                <i class="fas fa-users" style="font-size: 48px; color: #ccc; margin-bottom: 16px;"></i>
                <p>Member management functionality would be implemented here</p>
            </div>
        </div>
    `;
}

function renderGroupOwnersTab(group) {
    return `
        <div class="owners-content">
            <div class="owners-header">
                <h3>Owners</h3>
                <button class="btn btn-primary" onclick="addOwner()">
                    <i class="fas fa-plus"></i>
                    Add owner
                </button>
            </div>
            
            ${group.owners.length > 0 ? `
                <div class="app-table-container">
                    <table class="app-table">
                        <thead>
                            <tr>
                                <th>Owner</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>                        <tbody>
                            ${group.owners.map(owner => `
                                <tr>
                                    <td>
                                        <div class="owner-display">
                                            ${getOwnerAvatarHtml(owner)}
                                            <span class="owner-name">${owner.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="owner-email">${owner.email}</span>
                                    </td>
                                    <td>
                                        <span class="owner-type">${owner.type || 'Owner'}</span>
                                    </td>
                                    <td>
                                        <button class="action-btn" onclick="removeOwner('${owner.id}')" title="Remove owner">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            ` : `
                <div class="no-owners">
                    <i class="fas fa-user-slash" style="font-size: 48px; color: #ccc; margin-bottom: 16px;"></i>
                    <p>This group has no owners assigned</p>
                    <button class="btn btn-primary" onclick="addOwner()">Add owner</button>
                </div>
            `}
        </div>
    `;
    
    // Ensure modal functions are globally accessible after dynamic content update
    window.addOwner = addOwner;
    window.closeAddOwnerModal = closeAddOwnerModal;
    window.addSelectedOwners = addSelectedOwners;
    window.removeSelectedOwner = removeSelectedOwner;
    window.searchPotentialOwners = searchPotentialOwners;
    window.updateSearchResults = updateSearchResults;
    window.updateSelectedOwners = updateSelectedOwners;
    window.removeOwner = removeOwner;
}

// Utility Functions
function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

// Determine if an owner is a user or group by checking the availableUsers array
function getOwnerType(ownerId) {
    const ownerInfo = availableUsers.find(user => user.id === ownerId);
    return ownerInfo ? ownerInfo.type : 'user'; // Default to 'user' if not found
}

// Generate appropriate avatar HTML for owner based on user/group type
function getOwnerAvatarHtml(owner) {
    const ownerType = getOwnerType(owner.id);
    
    if (ownerType === 'group') {
        return `<div class="group-avatar">
            <i class="fas fa-users"></i>
        </div>`;
    } else {
        return `<div class="user-avatar">
            ${getInitials(owner.name)}
        </div>`;
    }
}

// Core Modal Functions - These were missing and causing the owner management to fail

function addOwner(event) {
    console.log('🔧 addOwner called');
    
    if (event && event.preventDefault) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const modal = document.getElementById('add-owner-modal');
    if (!modal) {
        console.error('Add owner modal not found');
        return false;
    }
    
    // Check if modal is already open or closing
    if (modal.hasAttribute('data-closing')) {
        console.log('Modal is currently closing - ignoring open request');
        return false;
    }
    
    if (modal.style.display === 'flex') {
        console.log('Modal is already open - ignoring duplicate open request');
        return false;
    }
    
    // Set modal context based on current page
    if (currentPage === 'app-owners' && currentApp) {
        currentModalContext = {
            type: currentApp.type,
            id: currentApp.data.id
        };
    } else if (currentPage === 'group-owners' && currentGroup) {
        currentModalContext = {
            type: 'group',
            id: currentGroup.id
        };
    } else {
        console.error('No valid context for adding owners');
        return false;
    }
    
    // Reset modal state
    selectedOwnersForModal = [];
    updateSelectedOwners();
    
    // Clear search
    const searchInput = document.getElementById('owner-search');
    if (searchInput) {
        searchInput.value = '';
    }
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
        searchResults.innerHTML = '<div class="no-results">Start typing to search for users or groups</div>';
    }
    
    // Clear any residual closing state
    modal.removeAttribute('data-closing');
    
    // Show modal
    modal.style.display = 'flex';
    modal.setAttribute('data-just-opened', 'true');
    
    // Remove protection after delay
    setTimeout(() => {
        modal.removeAttribute('data-just-opened');
    }, 200);
    
    console.log('Modal opened successfully');
    return true;
}

function closeAddOwnerModal(event) {
    console.log('🔧 closeAddOwnerModal called');
    
    if (event && event.preventDefault) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const modal = document.getElementById('add-owner-modal');
    if (!modal) {
        return;
    }
    
    // Check if already closed or closing
    if (modal.style.display === 'none' || modal.hasAttribute('data-closing')) {
        console.log('Modal already closed or closing');
        return;
    }
    
    // Set closing flag immediately
    modal.setAttribute('data-closing', 'true');
    
    // Hide modal
    modal.style.display = 'none';
    
    // Reset state
    selectedOwnersForModal = [];
    currentModalContext = null;
      // Clear search
    const searchInput = document.getElementById('owner-search');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Reset modal title and button text for add mode
    const modalTitle = modal.querySelector('.modal-title');
    const addButton = modal.querySelector('#add-owners-btn');
    if (modalTitle) {
        modalTitle.textContent = 'Add owners';
    }
    if (addButton) {
        addButton.textContent = 'Add owners';
    }
      // Reset owner type dropdown to default
    const ownerTypeSelect = document.getElementById('owner-type-select');
    if (ownerTypeSelect) {
        ownerTypeSelect.value = 'Contact';
    }
    
    // Clear selected owners display
    const selectedOwnersContainer = document.getElementById('selected-owners');
    if (selectedOwnersContainer) {
        selectedOwnersContainer.innerHTML = '<div class="no-selection">No owners selected</div>';
    }
    
    // Clear search results
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
        searchResults.innerHTML = '<div class="no-results">Start typing to search for users or groups</div>';
    }
      // Extended cleanup delay to prevent race conditions
    setTimeout(() => {
        if (modal) {
            modal.removeAttribute('data-closing');
            modal.removeAttribute('data-edit-mode'); // Clear edit mode flag
        }
    }, 300);
    
    console.log('Modal closed successfully');
}

function searchPotentialOwners(query) {
    console.log('🔍 searchPotentialOwners called with query:', query);
    
    const searchResults = document.getElementById('search-results');
    if (!searchResults) {
        console.error('Search results container not found');
        return;
    }
    
    if (!query || query.length < 2) {
        searchResults.innerHTML = '<div class="no-results">Start typing to search for users or groups</div>';
        return;
    }
      // Filter available users based on search query
    const matches = availableUsers.filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        (user.email && user.email.toLowerCase().includes(query.toLowerCase())) ||
        (user.description && user.description.toLowerCase().includes(query.toLowerCase()))
    );
    
    if (matches.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No users or groups found</div>';
        return;
    }
      // Render search results
    searchResults.innerHTML = matches.map(user => `
        <div class="search-result-item" onclick="selectOwnerFromSearch('${user.id}', '${user.name}', '${user.email || user.description || ''}', '${user.type}', event)">
            <div class="result-avatar">
                ${user.type === 'group' ? '<i class="fas fa-users"></i>' : getInitials(user.name)}
            </div>
            <div class="result-info">
                <div class="result-name">${user.name}</div>
                <div class="result-email">${user.type === 'group' ? (user.description || '') : (user.email || '')}</div>
                <div class="result-type">${user.type === 'group' ? 'Group' : 'User'}</div>
            </div>
        </div>
    `).join('');
    
    console.log(`Found ${matches.length} search results`);
}

function selectOwnerFromSearch(id, name, email, type, event) {
    console.log('🔧 selectOwnerFromSearch called', { id, name, email, type });
    
    if (event && event.preventDefault) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    // Check if already selected
    if (selectedOwnersForModal.find(owner => owner.id === id)) {
        console.log(`${name} is already selected`);
        return;
    }
    
    // Add to selected owners
    selectedOwnersForModal.push({
        id: id,
        name: name,
        email: email,
        type: type
    });
    
    updateSelectedOwners();
    console.log(`Added ${name} to selected owners`);
}

function updateSelectedOwners() {
    const container = document.getElementById('selected-owners');
    if (!container) {
        console.error('Selected owners container not found');
        return;
    }
    
    if (selectedOwnersForModal.length === 0) {
        container.innerHTML = '<div class="no-selection">No owners selected</div>';
        const addButton = document.getElementById('add-owners-btn');
        if (addButton) {
            addButton.disabled = true;
        }
        return;
    }
    
    container.innerHTML = selectedOwnersForModal.map(owner => `
        <div class="selected-owner-item">
            <div class="selected-avatar">
                ${owner.type === 'group' ? '<i class="fas fa-users"></i>' : getInitials(owner.name)}
            </div>
            <div class="selected-info">
                <div class="selected-name">${owner.name}</div>
                <div class="selected-email">${owner.email}</div>
                <div class="selected-type">${owner.type === 'group' ? 'Group' : 'User'}</div>
            </div>            <button class="remove-selected-btn" onclick="removeSelectedOwner('${owner.id}', event)" title="Remove">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
    
    // Enable/disable add button
    const addButton = document.getElementById('add-owners-btn');
    if (addButton) {
        addButton.disabled = false;
    }
    
    // Update validation
    validateOwnerSelection();
}

function removeSelectedOwner(id, event) {
    console.log('🔧 removeSelectedOwner called for id:', id);
    
    // Prevent event propagation to avoid closing the modal
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    selectedOwnersForModal = selectedOwnersForModal.filter(owner => owner.id !== id);
    updateSelectedOwners();
}

function validateOwnerSelection() {
    const selectedOwners = selectedOwnersForModal;
    const ownerTypeSelect = document.getElementById('owner-type-select');
    const ownerType = ownerTypeSelect ? ownerTypeSelect.value : 'Full Owner';
    
    const fullOwnerWarning = document.getElementById('owner-validation-warning');
    const technicalOwnerWarning = document.getElementById('technical-owner-warning');
    
    // Hide all warnings initially
    if (fullOwnerWarning) fullOwnerWarning.style.display = 'none';
    if (technicalOwnerWarning) technicalOwnerWarning.style.display = 'none';
    
    // Check if any selected owners are Groups and the owner type is Full Owner
    const hasGroupAsFullOwner = selectedOwners.some(owner => 
        owner.type === 'group' && ownerType === 'Full Owner'
    );
    
    // Check if any selected owners are Groups and the owner type is Technical Owner
    const hasGroupAsTechnicalOwner = selectedOwners.some(owner => 
        owner.type === 'group' && ownerType === 'Technical Owner'
    );
    
    // Show appropriate warnings
    if (hasGroupAsFullOwner && fullOwnerWarning) {
        fullOwnerWarning.style.display = 'block';
    }
    
    if (hasGroupAsTechnicalOwner && technicalOwnerWarning) {
        technicalOwnerWarning.style.display = 'block';
    }
    
    // Disable add button if groups are selected as Full Owner
    const addButton = document.getElementById('add-owners-btn');
    if (addButton) {
        addButton.disabled = hasGroupAsFullOwner || selectedOwners.length === 0;
    }
}

function addSelectedOwners() {
    console.log('📝 addSelectedOwners called');
    
    if (selectedOwnersForModal.length === 0) {
        console.log('No owners selected to add');
        return false;
    }
    
    if (!currentModalContext) {
        console.error('No modal context available');
        return false;
    }
    
    const modal = document.getElementById('add-owner-modal');
    const isEditMode = modal && modal.hasAttribute('data-edit-mode');
    
    const ownerTypeSelect = document.getElementById('owner-type-select');
    const ownerType = ownerTypeSelect ? ownerTypeSelect.value : 'Full Owner';
    
    // Find target object based on context
    let targetObject = null;
    if (currentModalContext.type === 'enterprise') {
        targetObject = enterpriseApps.find(a => a.id === currentModalContext.id);
    } else if (currentModalContext.type === 'registration') {
        targetObject = appRegistrations.find(a => a.id === currentModalContext.id);
    } else if (currentModalContext.type === 'group') {
        targetObject = groups.find(g => g.id === currentModalContext.id);
    }
    
    if (!targetObject) {
        console.error('Target object not found for context:', currentModalContext);
        return false;
    }
    
    if (isEditMode) {
        // Edit mode: Update existing owner's type
        const selectedOwner = selectedOwnersForModal[0]; // Should only have one in edit mode
        const existingOwner = targetObject.owners.find(owner => owner.id === selectedOwner.id);
        
        if (existingOwner) {
            const oldType = existingOwner.type;
            existingOwner.type = ownerType;
            console.log(`Updated owner ${existingOwner.name} type from ${oldType} to ${ownerType}`);
        } else {
            console.error('Existing owner not found for editing:', selectedOwner.id);
            return false;
        }
    } else {
        // Add mode: Add new owners
        const newOwners = selectedOwnersForModal.map(item => ({
            id: item.id,
            name: item.name,
            email: item.email || `${item.name.toLowerCase().replace(/\s+/g, '.')}@contoso.com`,
            type: ownerType
        }));
        
        targetObject.owners.push(...newOwners);
    }    
    console.log('Owners after operation:', targetObject.owners);
    
    // Save context before closing modal (since closeAddOwnerModal clears it)
    const savedContext = { ...currentModalContext };
    console.log('Saved context for refresh:', savedContext);
    
    // Close modal first
    closeAddOwnerModal();
    
    // Refresh the current view to show updated owners using saved context
    try {
        if (savedContext.type === 'group') {
            showGroupOwnersPage(savedContext.id);
        } else {
            showAppOwnersPage(savedContext.type, savedContext.id);
        }
        console.log('Refreshed view to show updated owners');
    } catch (error) {
        console.log('Error refreshing view:', error);
        console.error('Refresh error details:', error);
    }
    
    // Show success notification based on mode
    if (isEditMode) {
        showNotification(`Successfully updated owner type for ${targetObject.name}`, 'success');
    } else {
        const addedCount = selectedOwnersForModal.length;
        showNotification(`Successfully added ${addedCount} owner(s) to ${targetObject.name}`, 'success');
    }
    
    return true;
}

function removeOwner(ownerId) {
    console.log('🗑️ removeOwner called for ownerId:', ownerId);
    
    if (!confirm('Are you sure you want to remove this owner?')) {
        return;
    }
    
    let targetObject = null;
    let ownerName = '';
    let targetName = '';
    
    // Determine context and find target object
    if (currentPage === 'app-owners' && currentApp) {
        if (currentApp.type === 'enterprise') {
            targetObject = enterpriseApps.find(a => a.id === currentApp.data.id);
        } else if (currentApp.type === 'registration') {
            targetObject = appRegistrations.find(a => a.id === currentApp.data.id);
        }
    } else if (currentPage === 'group-owners' && currentGroup) {
        targetObject = groups.find(g => g.id === currentGroup.id);
    }
    
    if (!targetObject) {
        console.error('Cannot determine context for owner removal');
        return;
    }
      // Find the owner to remove
    const ownerIndex = targetObject.owners.findIndex(owner => owner.id === ownerId);
    if (ownerIndex === -1) {
        console.error('Owner not found for removal');
        return;
    }
    
    ownerName = targetObject.owners[ownerIndex].name;
    targetName = targetObject.name;
    
    // Remove the owner
    targetObject.owners.splice(ownerIndex, 1);
    
    console.log(`Removed owner ${ownerName} from ${targetName}`);
    
    // Refresh the current view
    try {
        if (currentPage === 'group-owners') {
            showGroupOwnersPage(currentGroup.id);
        } else if (currentPage === 'app-owners') {
            showAppOwnersPage(currentApp.type, currentApp.data.id);
        }
        console.log('Refreshed view after owner removal');
    } catch (error) {
        console.error('Error refreshing view after removal:', error);
    }
    
    // Show success notification
    showNotification(`Successfully removed ${ownerName} from ${targetName}`, 'success');
}

// Utility functions for modal
function updateSearchResults() {
    // Alias for searchPotentialOwners for backward compatibility
    const searchInput = document.getElementById('owner-search');
    if (searchInput) {
        searchPotentialOwners(searchInput.value);
    }
}

function editOwnerType(ownerId) {
    console.log('📝 editOwnerType called with ownerId:', ownerId);
    
    const modal = document.getElementById('add-owner-modal');
    if (!modal) {
        console.error('Add owner modal not found');
        return false;
    }
    
    // Check if modal is already open or closing
    if (modal.hasAttribute('data-closing')) {
        console.log('Modal is currently closing - ignoring open request');
        return false;
    }
    
    if (modal.style.display === 'flex') {
        console.log('Modal is already open - ignoring duplicate open request');
        return false;
    }
    
    // Set modal context based on current page
    if (currentPage === 'app-owners' && currentApp) {
        currentModalContext = {
            type: currentApp.type,
            id: currentApp.data.id
        };
    } else if (currentPage === 'group-owners' && currentGroup) {
        currentModalContext = {
            type: 'group',
            id: currentGroup.id
        };
    } else {
        console.error('No valid context for editing owner type');
        return false;
    }    // Find the owner being edited
    let ownerToEdit = null;
    if (currentApp && currentApp.data.owners) {
        ownerToEdit = currentApp.data.owners.find(owner => owner.id === ownerId);
    } else if (currentGroup && currentGroup.owners) {
        ownerToEdit = currentGroup.owners.find(owner => owner.id === ownerId);
    }
    
    if (!ownerToEdit) {
        console.error('Owner not found for editing:', ownerId);
        return false;
    }// Find the owner in availableUsers to get the full info
    const ownerInfo = availableUsers.find(user => user.id === ownerId);
    
    if (!ownerInfo) {
        console.error('Owner info not found in availableUsers:', ownerId);
        return false;
    }
      // Pre-select the owner in the modal
    selectedOwnersForModal = [{
        id: ownerInfo.id,
        name: ownerInfo.name,
        email: ownerInfo.email || ownerToEdit.email || `${ownerInfo.name.toLowerCase().replace(/\s+/g, '.')}@contoso.com`,
        type: ownerInfo.type,
        currentOwnerType: ownerToEdit.type // Store the current owner type for potential updating
    }];
    
    // Clear search
    const searchInput = document.getElementById('owner-search');
    if (searchInput) {
        searchInput.value = '';
    }
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
        searchResults.innerHTML = '<div class="no-results">Start typing to search for users or groups</div>';
    }    // Update the selected owners display
    updateSelectedOwners();
      // Set the owner type dropdown to the current owner's type
    const ownerTypeSelect = document.getElementById('owner-type-select');
    if (ownerTypeSelect && ownerToEdit.type) {
        ownerTypeSelect.value = ownerToEdit.type;
    }
    
    // Validate the owner selection (for warnings and button state)
    validateOwnerSelection();
    
    // Update modal title and button for edit mode
    const modalTitle = modal.querySelector('.modal-title');
    const addButton = modal.querySelector('#add-owners-btn');
    if (modalTitle) {
        modalTitle.textContent = 'Edit owner type';
    }
    if (addButton) {
        addButton.textContent = 'Update owner';
    }
    
    // Clear any residual closing state
    modal.removeAttribute('data-closing');
    
    // Show modal
    modal.style.display = 'flex';
    modal.setAttribute('data-just-opened', 'true');
    modal.setAttribute('data-edit-mode', 'true'); // Flag to indicate edit mode
    
    // Remove protection after delay
    setTimeout(() => {
        modal.removeAttribute('data-just-opened');
    }, 200);
    
    console.log('Modal opened in edit mode for owner:', ownerToEdit);
    return true;
}

// Ensure this function is globally available immediately
window.editOwnerType = editOwnerType;

// Make all functions globally available
ensureModalFunctionsGlobal();

console.log('✅ All modal functions restored and globally assigned');

// Test function availability
console.log('🧪 Testing editOwnerType function availability:', typeof window.editOwnerType);
if (typeof window.editOwnerType === 'function') {
    console.log('✅ editOwnerType is available globally');
} else {
    console.error('❌ editOwnerType is NOT available globally');
}

// Settings Dropdown Functions
function toggleSettingsDropdown() {
    const dropdown = document.getElementById('settings-dropdown');
    dropdown.classList.toggle('show');
}

// Close settings dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('settings-dropdown');
    const settingsButton = event.target.closest('.settings-dropdown');
    
    if (!settingsButton && dropdown) {
        dropdown.classList.remove('show');
    }
});

// Make settings functions globally available
window.toggleSettingsDropdown = toggleSettingsDropdown;

// Help Overlay Functions
function openHelpOverlay() {
    const overlay = document.getElementById('help-overlay');
    if (overlay) {
        overlay.style.display = 'flex';
        
        // Add click outside to close functionality
        overlay.addEventListener('click', function(event) {
            if (event.target === overlay) {
                closeHelpOverlay();
            }
        });
    }
}

function closeHelpOverlay() {
    const overlay = document.getElementById('help-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// Make help functions globally available
window.openHelpOverlay = openHelpOverlay;
window.closeHelpOverlay = closeHelpOverlay;

// Dark Mode Functions
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';    if (darkModeToggle) {
        darkModeToggle.checked = savedDarkMode;
        darkModeToggle.addEventListener('change', function() {
            const isDarkMode = this.checked;
            localStorage.setItem('darkMode', isDarkMode);
            applyDarkModeGlobally(isDarkMode);
        });
    }
    
    // Apply dark mode on page load
    applyDarkModeGlobally(savedDarkMode);
}

function applyDarkModeGlobally(isDarkMode) {
    const body = document.body;
    const mainContent = document.getElementById('main-content');
    const sidebar = document.getElementById('sidebar');
    const modal = document.getElementById('add-owner-modal');
    
    if (isDarkMode) {
        body.classList.add('dark-mode');
        if (mainContent) mainContent.classList.add('dark-mode');
        if (sidebar) sidebar.classList.add('dark-mode-sidebar');
        if (modal) modal.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
        if (mainContent) mainContent.classList.remove('dark-mode');
        if (sidebar) sidebar.classList.remove('dark-mode-sidebar');
        if (modal) modal.classList.remove('dark-mode');
    }
}

// Initialize dark mode when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeDarkMode);
