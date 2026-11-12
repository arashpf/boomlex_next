import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RangeFilters from './RangeFilters';

const MainFilters = ({
  selectedCategory,
  selectedNeighborhoods,
  selectedFeatures,
  rangeFilters,
  sortBy,
  onSectionChange,
  onFeatureToggle,
  onRangeFilterChange,
  onSortChange,
  getSortDisplayText,
  features,
  // NEW: Add props for category fields
  categoryFields = {},
  loadingFields = false,
  onFieldValueChange = () => {},
  fieldValues = {},
}) => {
  // Destructure category fields
  const { normal = [], tick = [], predefine = [] } = categoryFields;

  // Render normal fields (price, area, etc.)
  const renderNormalFields = () => {
    if (normal.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>مشخصات:</Text>
        {normal.map((field) => {
          const value = fieldValues[field.name] || '';
          const label = field.label || field.name || 'بدون عنوان';

          // Determine field type based on name or type property
          const fieldType = determineFieldType(field);
          
          switch (fieldType) {
            case 'number':
            case 'price':
              return renderNumberField(field, value, label);
            case 'text':
              return renderTextField(field, value, label);
            case 'boolean':
              return renderBooleanField(field, value, label);
            default:
              return renderNumberField(field, value, label); // Default to number
          }
        })}
      </View>
    );
  };

  // Render number input field
  const renderNumberField = (field, value, label) => {
    const placeholder = getPlaceholder(field);

    return (
      <View key={field.id || field.name} style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.numberInput}
            placeholder={placeholder}
            value={value}
            onChangeText={(text) => onFieldValueChange(field.name, text)}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
          {getFieldUnit(field) && (
            <Text style={styles.unitText}>{getFieldUnit(field)}</Text>
          )}
        </View>
      </View>
    );
  };

  // Render text input field
  const renderTextField = (field, value, label) => {
    return (
      <View key={field.id || field.name} style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <TextInput
          style={styles.textInput}
          placeholder={`${label} را وارد کنید`}
          value={value}
          onChangeText={(text) => onFieldValueChange(field.name, text)}
          placeholderTextColor="#999"
        />
      </View>
    );
  };

  // Render boolean (switch) field
  const renderBooleanField = (field, value, label) => {
    const boolValue = value === true || value === 'true' || value === '1';

    return (
      <View key={field.id || field.name} style={styles.booleanField}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <Switch
          value={boolValue}
          onValueChange={(newValue) => onFieldValueChange(field.name, newValue)}
          trackColor={{ false: "#767577", true: "#7a97ff" }}
          thumbColor={Platform.OS === 'android' ? "#f4f3f4" : "#f4f3f4"}
        />
      </View>
    );
  };

  // Render tick fields from category data
  const renderTickFields = () => {
    if (tick.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>امکانات:</Text>
        {tick.map((feature) => {
          // Try to find if this tick field is already selected in selectedFeatures
          const isSelected = selectedFeatures.some(
            (f) => f.id === feature.id || f.name === feature.name
          ) || (fieldValues[feature.name] === true);

          return (
            <TouchableOpacity
              key={feature.id || feature.name}
              style={[
                styles.featureItem,
                isSelected && styles.featureItemSelected,
              ]}
              onPress={() => {
                // Handle both ways: through onFeatureToggle for existing logic
                // or through onFieldValueChange for new fields
                if (onFeatureToggle) {
                  onFeatureToggle(feature);
                } else {
                  onFieldValueChange(feature.name, !isSelected);
                }
              }}
            >
              <View style={styles.checkbox}>
                {isSelected && <Icon name="check" size={16} color="white" />}
              </View>
              <Text style={[
                styles.featureText,
                isSelected && styles.featureTextSelected
              ]}>
                {feature.label || feature.name || `دارای ${feature.value}`}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  // In MainFilters.js, update the determineFieldType function:
const determineFieldType = (field) => {
  if (field.type) {
    // Your API returns type as string '1', '2', etc.
    // Based on your API response, type '1' seems to be number/price fields
    return field.type === '1' ? 'number' : 'text';
  }
  
  const value = field.value?.toLowerCase() || '';
  
  // Check for price fields
  if (value.includes('قیمت') || value.includes('price')) {
    return 'price';
  }
  
  // Check for area fields
  if (value.includes('متراژ') || value.includes('area') || value.includes('متر')) {
    return 'number';
  }
  
  // Check for year/age fields
  if (value.includes('سال') || value.includes('year') || value.includes('age')) {
    return 'number';
  }
  
  // Check for count fields
  if (value.includes('تعداد') || value.includes('count') || value.includes('room')) {
    return 'number';
  }
  
  // Check for tick fields (these should be in tick_fields, not normal_fields)
  if (value.includes('آسانسور') || value.includes('پارکینگ') || 
      value.includes('انباری') || value.includes('آب') || 
      value.includes('برق') || value.includes('گاز')) {
    return 'boolean'; // These are actually tick/boolean fields
  }
  
  return 'text';
};

  // Get placeholder text for field
  const getPlaceholder = (field) => {
    const name = field.name?.toLowerCase() || '';
    
    if (name.includes('price') || name.includes('قیمت')) {
      return 'مثال: 1000000';
    } else if (name.includes('rent') || name.includes('اجاره')) {
      return 'مثال: 5000000';
    } else if (name.includes('deposit') || name.includes('پول پیش')) {
      return 'مثال: 20000000';
    } else if (name.includes('area') || name.includes('متراژ')) {
      return 'مثال: 120';
    } else if (name.includes('age') || name.includes('سن')) {
      return 'مثال: 5';
    } else if (name.includes('room') || name.includes('اتاق')) {
      return 'مثال: 3';
    } else if (name.includes('floor') || name.includes('طبقه')) {
      return 'مثال: 2';
    }
    return 'مقدار مورد نظر را وارد کنید';
  };

  // Get field unit based on field name
  const getFieldUnit = (field) => {
    const name = field.name?.toLowerCase() || '';
    
    if (field.unit) return field.unit;
    if (name.includes('price') || name.includes('قیمت') || 
        name.includes('rent') || name.includes('اجاره') ||
        name.includes('deposit') || name.includes('پول پیش')) {
      return 'تومان';
    }
    if (name.includes('area') || name.includes('متراژ')) return 'متر';
    if (name.includes('age') || name.includes('سن')) return 'سال';
    return null;
  };

  // Loading state for fields
  const renderLoadingState = () => {
    if (!loadingFields || (normal.length + tick.length + predefine.length > 0)) {
      return null;
    }

    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>در حال بارگذاری فیلترها...</Text>
      </View>
    );
  };

  // MainFilters.js - simplified renderFeatures
const renderFeatures = () => {
  // First try tick fields from category
  if (categoryFields.tick && categoryFields.tick.length > 0) {
    console.log('🎯 Using tick fields from API:', categoryFields.tick.length);
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>امکانات:</Text>
        <Text style={{color: 'green', fontSize: 12, marginBottom: 10}}>
          نمایش امکانات داینامیک از API
        </Text>
        {categoryFields.tick.map((feature) => {
          // Check if selected - use value for comparison
          const isSelected = selectedFeatures.some(
            (f) => f.value === feature.value || f.id === feature.id
          );

          return (
            <TouchableOpacity
              key={feature.id || feature.value}
              style={[
                styles.featureItem,
                isSelected && styles.featureItemSelected,
              ]}
              onPress={() => {
                console.log('Toggling feature:', feature.value);
                onFeatureToggle(feature);
              }}
            >
              <View style={styles.checkbox}>
                {isSelected && <Icon name="check" size={16} color="#7a97ff" />}
              </View>
              <Text style={[
                styles.featureText,
                isSelected && styles.featureTextSelected
              ]}>
                {feature.value}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  
  // Then try static features prop as fallback
  if (features && features.length > 0) {
    console.log('⚠️ No tick fields, using static features:', features.length);
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>امکانات:</Text>
        {features.map((feature) => {
          const isSelected = selectedFeatures.some(
            (f) => f.value === feature.value
          );

          return (
            <TouchableOpacity
              key={feature.id}
              style={[
                styles.featureItem,
                isSelected && styles.featureItemSelected,
              ]}
              onPress={() => onFeatureToggle(feature)}
            >
              <View style={styles.checkbox}>
                {isSelected && <Icon name="check" size={16} color="white" />}
              </View>
              <Text style={[
                styles.featureText,
                isSelected && styles.featureTextSelected
              ]}>
                دارای {feature.value}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  
  console.log('⚠️ No features available at all');
  return null;
};

  return (
    <ScrollView style={styles.filterContent}>
      {/* Loading State */}
      {renderLoadingState()}

      {/* Sort Options */}
      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>مرتب‌سازی</Text>
        <View style={styles.sortOptions}>
          <TouchableOpacity
            style={[
              styles.sortOption,
              sortBy === 'newest' && styles.sortOptionSelected,
            ]}
            onPress={() => onSortChange('newest')}
          >
            <Text style={[
              styles.sortOptionText,
              sortBy === 'newest' && styles.sortOptionTextSelected,
            ]}>
              جدیدترین
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.sortOption,
              sortBy === 'oldest' && styles.sortOptionSelected,
            ]}
            onPress={() => onSortChange('oldest')}
          >
            <Text style={[
              styles.sortOptionText,
              sortBy === 'oldest' && styles.sortOptionTextSelected,
            ]}>
              قدیمی ترین
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.sortOption,
              sortBy === 'most_viewed' && styles.sortOptionSelected,
            ]}
            onPress={() => onSortChange('most_viewed')}
          >
            <Text style={[
              styles.sortOptionText,
              sortBy === 'most_viewed' && styles.sortOptionTextSelected,
            ]}>
              پر بازدید ترین
            </Text>
          </TouchableOpacity>
        </View>
      </View> */}

      {/* Category Selection */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
        
          <TouchableOpacity 
            style={styles.changeButton}
            onPress={() => onSectionChange('categories')}
          >
            <Text style={styles.changeButtonText}>
              {selectedCategory ? 'تغییر' : 'انتخاب'}
            </Text>
          </TouchableOpacity>
            <Text style={styles.sectionTitle}>
            {selectedCategory ? `دسته بندی: ${selectedCategory.name}` : 'انتخاب دسته بندی'}
          </Text>
        </View>
      </View>

      {/* Features (Dynamic or Static) */}
      {renderFeatures()}

      {/* Dynamic Normal Fields (Price, Area, etc.) */}
      {renderNormalFields()}

      {/* Neighborhood Selection */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          
          <TouchableOpacity 
            style={styles.changeButton}
            onPress={() => onSectionChange('neighborhoods')}
          >
            <Text style={styles.changeButtonText}>
              {selectedNeighborhoods.length > 0 ? 'تغییر' : 'انتخاب'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>
            {selectedNeighborhoods.length > 0 
              ? `محلات: ${selectedNeighborhoods.slice(0, 2).map(n => n.name).join('، ')}${selectedNeighborhoods.length > 2 ? '...' : ''}`
              : 'انتخاب محلات'
            }
          </Text>
        </View>
      </View>

      

      {/* Range Filters */}
      {/* <RangeFilters
        rangeFilters={rangeFilters}
        onRangeFilterChange={onRangeFilterChange}
      /> */}

      <RangeFilters
        rangeFilters={rangeFilters}
        onRangeFilterChange={onRangeFilterChange}
        // NEW: Pass category fields props
        categoryFields={categoryFields}
        loadingFields={loadingFields}
        onFieldValueChange={onFieldValueChange}
        fieldValues={fieldValues}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filterContent: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    fontFamily: 'iransans',
  },
  changeButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
  },
  changeButtonText: {
    fontSize: 15,
    color: '#333',
    fontFamily: 'iransans',
  },
  sortOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sortOption: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  sortOptionSelected: {
    backgroundColor: '#7a97ff',
  },
  sortOptionText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'iransans',
  },
  sortOptionTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
featureItem: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between', // This spaces items to opposite ends
  paddingHorizontal: 12, // Keep horizontal padding
  paddingVertical: 12,
  backgroundColor: 'white',
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  marginBottom: 8,
},
featureItemSelected: {
  backgroundColor: '#e3f2fd',
  borderColor: '#7a97ff',
},
checkbox: {
  width: 20,
  height: 20,
  borderWidth: 2,
  borderColor: '#666',
  borderRadius: 4,
  justifyContent: 'center',
  alignItems: 'center',
  // Remove marginRight since we're using space-between
},
featureText: {
  fontSize: 14,
  color: '#666',
  fontFamily: 'iransans',
  flex: 1, // Allow text to take available space
  marginRight: 12, // Add some space between text and checkbox
},
featureTextSelected: {
  color: '#7a97ff',
  fontWeight: 'bold',
},

 
  // New styles for dynamic fields
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    fontFamily: 'iransans',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: 'iransans',
    textAlign: 'left',
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: 'iransans',
    textAlign: 'left',
    color: '#333',
  },
  unitText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    fontFamily: 'iransans',
    width: 40,
  },
  booleanField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'iransans',
  },
});

export default MainFilters;