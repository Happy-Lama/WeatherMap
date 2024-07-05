import pandas as pd
import json
import os

def json_to_csv(json_file_path, xyz_file_path):
    with open(json_file_path, 'r') as json_file:
        json_data = json.load(json_file)

    header = json_data[0]['header']
    values = json_data[0]['data']

    data = []
    for y in range(header['ny']):
        for x in range(header['nx']):
            # Calculate latitude and longitude
            latitude = header['la1'] - y * header['dy']
            longitude = header['lo1'] + x * header['dx']
            
            # Adjust longitude to be in the range -180 to 180
            if longitude > 180:
                longitude -= 360

            value = values[y * header['nx'] + x]
            data.append([longitude, latitude, value])

    df = pd.DataFrame(data, columns=['x', 'y', 'value'])
    df.to_csv(xyz_file_path, sep=' ', header=True, index=False)

    print(f'XYZ file created: {xyz_file_path}')

# json_to_xyz('current-wind-surface-level-gfs-1.0.json', 'input.csv')

def create_vrt(vrt_file_path, xyz_file_path, epsg_code, file_name):
    vrt_content = f"""
<OGRVRTDataSource>
    <OGRVRTLayer name="{file_name}">
        <SrcDataSource>{xyz_file_path}</SrcDataSource>
        <GeometryType>wkbPoint</GeometryType>
        <LayerSRS>EPSG:{epsg_code}</LayerSRS>
        <GeometryField encoding="PointFromColumns" x="x" y="y" z="value"/>
    </OGRVRTLayer>
</OGRVRTDataSource>
    """

    with open(vrt_file_path, 'w') as vrt_file:
        vrt_file.write(vrt_content)

    print(f'VRT file created: {vrt_file_path}')

# create_vrt('input.vrt', 'input.xyz', '4326')



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
    

def main():
    json_dir = "../data/weather/current/"
    out_dir_csv = "./csv/"
    out_dir_vrt = "./vrt/"
    out_dir_geotiff = "./geotiffs/"
    out_dir_png = "./images/"
    color_ramps = "./color_ramps/"


    files = list_files(json_dir)
    for i, file in enumerate(files):
        json_to_csv(json_dir + file,  out_dir_csv + f"{i + 1}.csv")
        create_vrt(out_dir_vrt + f"{i + 1}.vrt", "D://Spacey_Andiima/leon_map_visualization/demo" + out_dir_csv[1:] + f"{i + 1}.csv", "4326", i + 1)

if __name__ == '__main__':
    main()