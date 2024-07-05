import json
import os
import pandas as pd

def get_value_at_coordinates(data, header, lat, lng):
    # Extract grid parameters
    lo1 = header["lo1"]
    la1 = header["la1"]
    lo2 = header["lo2"]
    la2 = header["la2"]
    nx = header["nx"]
    ny = header["ny"]
    dx = header["dx"]
    dy = header["dy"]
    
    # Check if the given coordinates are within the grid bounds
    if not ((0 <= lng + 180 <= 360) and (-90 <= lat <= 90)):
        # print(-90 <= lat <= 90)
        print(lo1, lo2, lng, la1, la2, lat)
        raise ValueError("Coordinates out of bounds")

    # Calculate indices
    i = int((la1 - lat) / dy)
    j = int((lng - lo1 + 180) / dx)
    
    # Calculate the 1D index
    index = i * nx + j
    
    # Retrieve the value from the data array
    value = data[index]
    
    return value

def list_files(directory):
    try:
        files = [f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))]
        return files
    except FileNotFoundError:
        print(f"The directory {directory} does not exist.")
        return []
    except Exception as e:
        print(f"An error occurred: {e}")
        return []

json_dir = '../data/weather/current/'

files = list_files(json_dir)

cities_csv = pd.read_csv('worldcities.csv')

for file in files:
    new_data = []
    with open(json_dir + file, 'rb') as f:
        file_data = json.load(f)
        for city in cities_csv.values:
            new_data.append(get_value_at_coordinates(file_data[0]['data'], file_data[0]['header'], city[2], city[3]))
        cities_csv[file] = new_data


cities_csv.to_csv('cities_values.csv')
