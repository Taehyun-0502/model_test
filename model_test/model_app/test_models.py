import ModelService
import IrisService

def test_tips():
    print("\n--- Testing Tips Model Service ---")
    sample_tips_data = {
        'total_bill': 25.0,
        'sex': 'Female',
        'smoker': False,
        'day': 'Sat',
        'time': 'Dinner',
        'size': 2
    }
    try:
        prediction = ModelService.predict(sample_tips_data)
        print(f"Tips prediction success! Predicted tip: {prediction}")
    except Exception as e:
        print(f"Tips prediction failed: {e}")

def test_iris():
    print("\n--- Testing Iris Model Service ---")
    sample_iris_data = {
        'sepal_length': 5.1,
        'sepal_width': 3.5,
        'petal_length': 1.4,
        'petal_width': 0.2
    }
    try:
        prediction = IrisService.predict(sample_iris_data)
        print(f"Iris prediction success! Predicted species: {prediction}")
    except Exception as e:
        print(f"Iris prediction failed: {e}")

if __name__ == "__main__":
    test_tips()
    test_iris()
