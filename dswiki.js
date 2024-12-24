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

    // Force Isotope to properly layout after all elements are loaded
    window.addEventListener('load', () => {
        iso.arrange({ filter: '*' }); // Ensure all items are visible
    });

    // Dark mode styling
    document.body.style.backgroundColor = "#121212";
    document.body.style.color = "#ffffff";
    document.body.style.fontFamily = "Arial, sans-serif";

    // Apply grid styling
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(auto-fit, 150px)";
    grid.style.gridGap = "15px";
    grid.style.justifyContent = "center";
    grid.style.padding = "20px";
    grid.style.margin = "0 auto";

    // Style grid items
    const items = document.querySelectorAll('.element-item');
    items.forEach(item => {
        item.style.display = "flex";
        item.style.flexDirection = "column";
        item.style.justifyContent = "space-between";
        item.style.alignItems = "center";
        item.style.width = "150px";
        item.style.height = "150px";
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
        heading.style.marginBottom = "15px";
        heading.style.textAlign = "center";
        heading.style.whiteSpace = "normal";
        heading.style.overflow = "hidden";
        heading.style.textOverflow = "ellipsis";
        heading.style.display = "-webkit-box";
        heading.style.webkitBoxOrient = "vertical";
        heading.style.webkitLineClamp = 2; // Limit to two lines
    });

    // Style subtypes
    const subtypes = document.querySelectorAll('.element-item .subtype');
    subtypes.forEach(subtype => {
        subtype.style.fontSize = "11px";
        subtype.style.color = "#aaaaaa";
        subtype.style.textAlign = "center";
        subtype.style.marginTop = "auto";
        subtype.style.position = "absolute";
        subtype.style.bottom = "5px";
        subtype.style.width = "100%";
    });

    // Tooltip for item descriptions
    const tooltip = document.createElement('div');
    tooltip.id = 'tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px 10px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.opacity = '0';
    tooltip.style.transition = 'opacity 0.3s ease';
    tooltip.style.pointerEvents = 'none';
    document.body.appendChild(tooltip);

    items.forEach(item => {
        const description = item.querySelector('.itemDescription')?.textContent.trim() || "No description available.";

        item.addEventListener('mouseenter', (event) => {
            tooltip.textContent = description;
            tooltip.style.opacity = '1';
            tooltip.style.left = `${event.pageX + 10}px`;
            tooltip.style.top = `${event.pageY + 10}px`;
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
