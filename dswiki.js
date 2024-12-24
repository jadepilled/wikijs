window.boot.register('page-ready', () => {
    const grid = document.querySelector('.grid');

    if (!grid) {
        console.error("Grid element not found. Ensure there is an element with class 'grid' in the DOM.");
        return;
    }

    // Initialize Isotope
    const iso = new Isotope(grid, {
        itemSelector: '.element-item',
        layoutMode: 'fitRows',
        getSortData: {
            name: '.name',
            subtype: '[data-subtype]'
        }
    });

    console.log("Isotope initialized successfully.");
});

	    // Force Isotope to properly layout after all elements are loaded
    window.addEventListener('load', function () {
        iso.arrange({ filter: '*' }); // Ensure all items are visible
    });
	
    // Dark mode styling
    document.body.style.backgroundColor = "#121212";
    document.body.style.color = "#ffffff";
    document.body.style.fontFamily = "Arial, sans-serif";

    // Apply grid styling
    
grid.style.display = "grid";
grid.style.gridTemplateColumns = "repeat(auto-fit, 150px)"; // Adjust column count based on item size
grid.style.gridGap = "15px"; // Ensure consistent spacing between items
grid.style.justifyContent = "center"; // Center items horizontally
grid.style.padding = "20px"; // Add padding around the grid
grid.style.margin = "0 auto"; // Center the grid container

    // Style grid items
const items = document.querySelectorAll('.element-item');
items.forEach(item => {
    item.style.display = "flex";
    item.style.flexDirection = "column";
    item.style.justifyContent = "space-between"; // Ensure spacing between content
    item.style.alignItems = "center";
    item.style.width = "150px"; // Fixed width
    item.style.height = "150px"; // Fixed height
    item.style.margin = "10px";
    item.style.backgroundColor = "#1e1e1e";
    item.style.color = "#ffffff";
    item.style.borderRadius = "10px";
    item.style.padding = "10px";
    item.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    item.style.textAlign = "center";
    item.style.overflow = "hidden";
});


// Style headings
const headings = document.querySelectorAll('.element-item .name');
headings.forEach(heading => {
    heading.style.fontSize = "12px";
    heading.style.fontWeight = "bold";
    heading.style.marginBottom = "25px"; // Add proper spacing
    heading.style.textAlign = "center";
    heading.style.whiteSpace = "normal";
    heading.style.overflow = "visible"; // Ensure no part of the text is hidden
    heading.style.display = "block"; // Ensure block layout for headings
    heading.style.lineHeight = "1.2em"; // Set line height for proper spacing
    heading.style.maxHeight = "2.4em"; // Limit height to two lines
    heading.style.textOverflow = "ellipsis"; // Add ellipsis for overflow
    heading.style.wordWrap = "break-word"; // Break words if they exceed container width
    heading.style.clipPath = "inset(0px 0px 0px)"; // Prevent text from overflowing without hiding it
});


   // Style subtypes
const subtypes = document.querySelectorAll('.element-item .subtype');
subtypes.forEach(subtype => {
    subtype.style.fontSize = "11px";
    subtype.style.color = "#aaaaaa";
    subtype.style.textAlign = "center";
    subtype.style.marginTop = "auto"; // Reserve space dynamically
    subtype.style.paddingTop = "15px"; // Add spacing from heading
    subtype.style.position = "absolute";
    subtype.style.bottom = "-5px"; // Keep subtype text at the bottom
    subtype.style.width = "100%"; // Ensure it doesn’t leave the container
});


    // Style images
    const images = document.querySelectorAll('.element-item img');
    images.forEach(image => {
        image.style.maxWidth = "80px";
        image.style.maxHeight = "80px";
        image.style.marginBottom = "10px";
    });

    // Generate subtype filter buttons dynamically
    const subtypeSet = new Set();
    items.forEach(item => {
        const subtype = item.querySelector('.subtype').textContent.trim();
        subtypeSet.add(subtype);
    });

    const filterBar = document.createElement('div');
    filterBar.id = "filter-bar";
    filterBar.style.display = "flex";
    filterBar.style.justifyContent = "center";
    filterBar.style.flexWrap = "wrap";
    filterBar.style.gap = "10px";
    filterBar.style.marginBottom = "20px";

    const allButton = document.createElement('button');
    allButton.textContent = "Show All";
    allButton.dataset.filter = "*";
    allButton.style.backgroundColor = "#333333";
    allButton.style.color = "#ffffff";
    allButton.style.padding = "10px 20px";
    allButton.style.border = "none";
    allButton.style.borderRadius = "5px";
    allButton.style.cursor = "pointer";
    allButton.style.transition = "background-color 0.3s ease";
    allButton.classList.add('is-checked'); // Default selected
iso.arrange({ filter: '*' }); // Ensure all items are displayed on page load
updateButtonStyles(allButton); // Ensure the button visually appears selected

    allButton.addEventListener('click', () => {
        iso.arrange({ filter: '*' });
        updateButtonStyles(allButton);
    });
    filterBar.appendChild(allButton);

    subtypeSet.forEach(subtype => {
        const button = document.createElement('button');
        button.textContent = subtype;
        button.dataset.filter = [data-subtype='${subtype}'];
        button.style.backgroundColor = "#333333";
        button.style.color = "#ffffff";
        button.style.padding = "10px 20px";
        button.style.border = "none";
        button.style.borderRadius = "5px";
        button.style.cursor = "pointer";
        button.style.transition = "background-color 0.3s ease";
        button.addEventListener('click', () => {
            iso.arrange({ filter: [data-subtype='${subtype}'] });
            updateButtonStyles(button);
        });
        filterBar.appendChild(button);
    });

    document.body.insertBefore(filterBar, grid);

    // Update button styles
    function updateButtonStyles(selectedButton) {
        const buttons = filterBar.querySelectorAll('button');
        buttons.forEach(button => {
            button.style.backgroundColor = "#333333";
            button.classList.remove('is-checked');
        });
        selectedButton.style.backgroundColor = "#555555";
        selectedButton.classList.add('is-checked');
    }
});

// Style subtypes
const subtypes = document.querySelectorAll('.element-item .subtype');
subtypes.forEach(subtype => {
    subtype.style.fontSize = "11px";
    subtype.style.color = "#aaaaaa";
    subtype.style.marginTop = "auto"; // Push the subtype to the bottom
    subtype.style.textAlign = "center";
});

window.boot.register('page-ready', () => {
    const tooltip = document.createElement('div');
    tooltip.id = 'tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px 10px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.opacity = '0';
    tooltip.style.transition = 'opacity 0.3s ease';
    tooltip.style.pointerEvents = 'none'; // Prevent interfering with hover events
    document.body.appendChild(tooltip);

    const items = document.querySelectorAll('.element-item');
    items.forEach(item => {
        const description = item.querySelector('.itemDescription')?.textContent.trim() || "No description available.";

        item.addEventListener('mouseenter', (event) => {
            if (description) {
                tooltip.textContent = description;
                tooltip.style.opacity = '1';
                tooltip.style.left = `${event.pageX + 10}px`; // Position near cursor
                tooltip.style.top = `${event.pageY + 10}px`;
            }
        });

        item.addEventListener('mousemove', (event) => {
            tooltip.style.left = `${event.pageX + 10}px`;
            tooltip.style.top = `${event.pageY + 10}px`;
        });

        item.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
    });
});

