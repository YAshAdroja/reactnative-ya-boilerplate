import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import CustomButton from '../CustomButton/CustomButton';

export interface EmptyViewProps {
  title?: string;
  description?: string;
  buttonTitle?: string;
  onButtonPress?: () => void;
}

export const EmptyView: React.FC<EmptyViewProps> = ({
  title = 'No Data Available',
  description = 'There are no items to display at the moment.',
  buttonTitle,
  onButtonPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {buttonTitle && onButtonPress && (
        <CustomButton
          title={buttonTitle}
          onPress={onButtonPress}
          variant="secondary"
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.h3,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  button: {
    marginTop: spacing.sm,
    minWidth: 140,
  },
});

export default EmptyView;
