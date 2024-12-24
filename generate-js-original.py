import os
import json

# Define the paths
base_dir = "C:/Dark Souls Wiki/BookStack/00 TEST"  # Replace with the path to your items directory
output_file = "isotope_data3.html"
image_extensions = [".png", ".webp"]

def generate_isotope_data(base_dir, output_file):
    entries = []

    # Traverse the directory
    for root, _, files in os.walk(base_dir):
        for file in files:
            if file.endswith(".html"):
                # Extract item information
                file_path = os.path.join(root, file)
                relative_path = os.path.relpath(file_path, base_dir)
                path_parts = relative_path.split(os.sep)

                # Name, subtype, and category
                name = os.path.splitext(file)[0].replace("_", " ")
                subtype = path_parts[-2] if len(path_parts) > 1 else "Unknown"
                category = path_parts[0] if len(path_parts) > 0 else "Misc"

                # Find matching image
                image_file = None
                for ext in image_extensions:
                    potential_image = os.path.join(base_dir, f"icons/{category}/{name}{ext}")
                    if os.path.exists(potential_image):
                        image_file = f"icons/{category}/{name}{ext}"
                        break

                # Build the entry
                entries.append({
                    "name": name,
                    "category": category,
                    "subtype": subtype,
                    "image": image_file
                })

    # Write the HTML output
    with open(output_file, "w", encoding="utf-8") as f:
        f.write("<div class=\"grid\">\n")
        for entry in entries:
            image_html = (
                f'<img src="{entry["image"]}" alt="{entry["name"]}" />\n'
                if entry["image"] else ""
            )
            f.write(
                f"    <div class=\"element-item {entry['category']}\" data-category=\"{entry['category']}\" data-subtype=\"{entry['subtype']}\">\n"
                f"        {image_html}"
                f"        <h3 class=\"name\">{entry['name']}</h3>\n"
                f"        <p class=\"subtype\">{entry['subtype']}</p>\n"
                f"    </div>\n"
            )
        f.write("</div>\n")

if __name__ == "__main__":
    generate_isotope_data(base_dir, output_file)
